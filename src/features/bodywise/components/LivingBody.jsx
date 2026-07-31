import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { OrbitControls, useFBX, useProgress } from "@react-three/drei";
import * as THREE from "three";
import {
  ATLAS_SYSTEMS,
  matchOrganId,
  systemsForFocus,
  systemsForMode,
  visibilityFor,
} from "../data/atlas.js";
import { ORGANS } from "../data/organs.js";
import { detectDeviceTier, pixelRatioForTier } from "../utils/deviceTier.js";

const TARGET_HEIGHT = 1.72;
const GHOST_OPACITY = 0.12;

/** Module-level prepared roots — survive React remounts, never re-parse FBX. */
const preparedCache = new Map();
/** Shared materials: `${systemId}:${state}:${tier}` → Material */
const materialCache = new Map();

class AtlasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) return this.props.fallback?.(this.state.error) ?? null;
    return this.props.children;
  }
}

function makeMaterial(systemId, state, tier) {
  const key = `${systemId}:${state}:${tier === "low" ? "low" : "std"}`;
  if (materialCache.has(key)) return materialCache.get(key);

  const base = {
    visceral: "#c4785a",
    lymphoid: "#9b6bb5",
    skeleton: "#e6dfd2",
    muscles: "#9a4038",
    cardiovascular: "#c41e3a",
    nervous: "#b89cff",
  };
  const color = base[systemId] || "#aaaaaa";
  const cheap = tier === "low";

  let mat;
  if (state === "ghost") {
    mat = cheap
      ? new THREE.MeshLambertMaterial({
          color,
          transparent: true,
          opacity: GHOST_OPACITY,
          depthWrite: false,
        })
      : new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: GHOST_OPACITY,
          depthWrite: false,
          roughness: 0.7,
          metalness: 0,
        });
  } else {
    mat = cheap
      ? new THREE.MeshLambertMaterial({ color })
      : new THREE.MeshStandardMaterial({
          color,
          roughness: systemId === "skeleton" ? 0.55 : 0.45,
          metalness: systemId === "cardiovascular" ? 0.06 : 0.02,
        });
  }

  if (mat.emissive) {
    if (systemId === "cardiovascular") {
      mat.emissive = new THREE.Color("#4a0010");
      mat.emissiveIntensity = 0.12;
    } else if (systemId === "nervous") {
      mat.emissive = new THREE.Color("#2a1848");
      mat.emissiveIntensity = 0.08;
    } else {
      mat.emissive = new THREE.Color("#000000");
      mat.emissiveIntensity = 0;
    }
  }

  materialCache.set(key, mat);
  return mat;
}

function meshTriCount(mesh) {
  const geo = mesh.geometry;
  if (!geo) return 0;
  if (geo.index) return geo.index.count / 3;
  if (geo.attributes?.position) return geo.attributes.position.count / 3;
  return 0;
}

/**
 * Detail budget: on weaker tiers, keep organ-tagged + large structures only.
 * Full-detail meshes stay in memory but visible=false (cheap).
 */
function shouldShowMesh(child, systemId, mode, tier) {
  const organId = child.userData.organId;
  if (organId) return true;

  // Structural systems: show everything on high, thin on low
  if (systemId === "skeleton" || systemId === "muscles") {
    if (tier === "low") return meshTriCount(child) >= 3000;
    if (tier === "medium") return meshTriCount(child) >= 1500;
    return meshTriCount(child) >= 200;
  }

  if (systemId === "cardiovascular" || systemId === "nervous") {
    if (tier === "low") return meshTriCount(child) >= 4000;
    if (tier === "medium") return meshTriCount(child) >= 1200;
    return meshTriCount(child) >= 300;
  }

  // Visceral / lymphoid context around organs
  if (tier === "low") return false;
  if (tier === "medium") return meshTriCount(child) >= 4000;
  return meshTriCount(child) >= 800;
}

function prepareSystem(fbx, systemId, tier) {
  const cached = preparedCache.get(systemId);
  if (cached) return cached;

  const root = fbx.clone(true);
  const heartMeshes = [];
  let meshCount = 0;
  let tris = 0;
  const shared = makeMaterial(systemId, "solid", tier);

  root.traverse((child) => {
    if (!child.isMesh) return;
    meshCount += 1;
    const t = meshTriCount(child);
    tris += t;
    child.userData.triCount = t;

    child.castShadow = false;
    child.receiveShadow = false;
    child.frustumCulled = true;
    // Shared material — do not clone per mesh
    child.material = shared;
    child.visible = true;

    const name = child.name || child.parent?.name || "";
    child.userData.systemId = systemId;
    child.userData.meshName = name;
    child.userData.organId = matchOrganId(name);
    child.userData.baseEmissive = shared.emissiveIntensity || 0;

    if (
      child.userData.organId === "heart" ||
      /aorta|ventricle|atrium/i.test(name)
    ) {
      heartMeshes.push(child);
    }

    if (child.morphTargetInfluences) child.morphTargetInfluences.length = 0;
  });

  root.userData.systemId = systemId;
  root.userData.meshCount = meshCount;
  root.userData.triCount = Math.round(tris);
  root.userData.heartMeshes = heartMeshes;
  root.visible = false;

  preparedCache.set(systemId, root);
  return root;
}

function triangleBudget(tier) {
  if (tier === "low") return 120000;
  if (tier === "medium") return 280000;
  return 450000;
}

const PRIORITY_ORGANS = new Set(["heart", "brain", "lungs", "liver", "stomach", "kidneys"]);

function enforceTriangleBudget(root, tier) {
  if (!root?.visible) return;
  const budget = triangleBudget(tier);
  const meshes = [];
  root.traverse((child) => {
    if (child.isMesh && child.visible) meshes.push(child);
  });
  let total = 0;
  for (const m of meshes) total += m.userData.triCount || meshTriCount(m);
  if (total <= budget) return;

  // 1) Drop non-priority meshes (largest first)
  const removable = meshes
    .filter((m) => !PRIORITY_ORGANS.has(m.userData.organId))
    .sort((a, b) => (b.userData.triCount || 0) - (a.userData.triCount || 0));

  for (const m of removable) {
    if (total <= budget) break;
    m.visible = false;
    total -= m.userData.triCount || 0;
  }
  if (total <= budget) return;

  // 2) Per organ keep only the largest mesh pieces until under budget
  const byOrgan = new Map();
  for (const m of meshes) {
    if (!m.visible || !m.userData.organId) continue;
    if (!byOrgan.has(m.userData.organId)) byOrgan.set(m.userData.organId, []);
    byOrgan.get(m.userData.organId).push(m);
  }
  for (const [, list] of byOrgan) {
    list.sort((a, b) => (b.userData.triCount || 0) - (a.userData.triCount || 0));
    // Keep first 2 pieces; hide the rest if still over budget
    for (let i = 2; i < list.length; i += 1) {
      if (total <= budget) return;
      if (!list[i].visible) continue;
      list[i].visible = false;
      total -= list[i].userData.triCount || 0;
    }
  }
  if (total <= budget) return;

  // 3) Last resort: hide smallest priority meshes
  const leftovers = meshes
    .filter((m) => m.visible)
    .sort((a, b) => (a.userData.triCount || 0) - (b.userData.triCount || 0));
  for (const m of leftovers) {
    if (total <= budget) break;
    // Never hide the single largest remaining mesh
    if (leftovers.length <= 3) break;
    m.visible = false;
    total -= m.userData.triCount || 0;
  }
}

function applyLayerPresentation(root, systemId, state, focusId, hotId, tier, mode) {
  if (!root) return;
  const active = state !== "hidden";
  root.visible = active;
  if (!active) return;

  const isGhost = state === "ghost";
  const baseMat = makeMaterial(systemId, isGhost ? "ghost" : "solid", tier);

  root.traverse((child) => {
    if (!child.isMesh) return;

    const show = shouldShowMesh(child, systemId, mode, tier);
    if (focusId && child.userData.organId && child.userData.organId !== focusId) {
      child.visible = show && tier === "high";
      if (tier !== "high") child.visible = false;
    } else {
      child.visible = show;
    }

    const organId = child.userData.organId;
    const isFocus = focusId && organId === focusId;
    const isHot = hotId && organId === hotId;

    if (isFocus || isHot) {
      if (!child.userData.glowMat) {
        child.userData.glowMat = baseMat.clone();
      }
      child.material = child.userData.glowMat;
      if (child.material.emissive) {
        child.material.emissiveIntensity = isFocus ? 0.45 : 0.28;
      }
    } else {
      child.material = baseMat;
    }
  });

  enforceTriangleBudget(root, tier);
}

function AtlasLayer({ systemId, state, onRoot, focusId, hotId, tier, mode }) {
  const url = ATLAS_SYSTEMS[systemId].url;
  const fbx = useFBX(url);
  const root = useMemo(() => prepareSystem(fbx, systemId, tier), [fbx, systemId, tier]);

  useEffect(() => {
    onRoot?.(systemId, root);
    root.visible = state !== "hidden";
    invalidate();
    return () => onRoot?.(systemId, null);
  }, [root, systemId, onRoot, state]);

  useEffect(() => {
    applyLayerPresentation(root, systemId, state, focusId, hotId, tier, mode);
    invalidate();
  }, [root, systemId, state, focusId, hotId, tier, mode]);

  // Cheap heart pulse — cloned mats only so shared vessel material stays stable
  useFrame(({ clock }) => {
    if (systemId !== "cardiovascular" || state !== "solid") return;
    if (tier === "low") return;
    const meshes = root.userData.heartMeshes;
    if (!meshes?.length) return;
    const pulse = 0.1 + Math.sin(clock.elapsedTime * 2.1) * 0.08;
    for (let i = 0; i < meshes.length; i += 1) {
      const m = meshes[i];
      if (!m.userData.pulseMat) {
        m.userData.pulseMat = m.material.clone();
        m.material = m.userData.pulseMat;
      }
      if (m.material?.emissive) {
        m.material.emissiveIntensity = pulse + (focusId === "heart" ? 0.25 : 0);
      }
    }
  });

  return <primitive object={root} />;
}

function CameraRig({ focusPoint, resetToken, animatingRef }) {
  const { camera } = useThree();
  const controls = useThree((s) => s.controls);
  const target = useRef(new THREE.Vector3(0, 0.12, 0));
  const camGoal = useRef(new THREE.Vector3(0, 0.32, 2.35));
  const primed = useRef(false);

  useEffect(() => {
    if (focusPoint) {
      target.current.copy(focusPoint);
      camGoal.current.copy(focusPoint).add(new THREE.Vector3(0.32, 0.18, 0.8));
    } else {
      target.current.set(0, 0.12, 0);
      camGoal.current.set(0, 0.32, 2.35);
    }
    animatingRef.current = true;
    invalidate();
  }, [focusPoint, resetToken, animatingRef]);

  useFrame((_, dt) => {
    if (!animatingRef.current && primed.current) return;
    const k = primed.current ? 1 - Math.exp(-3.4 * dt) : 1;
    camera.position.lerp(camGoal.current, k);
    if (controls?.target) {
      controls.target.lerp(target.current, k);
      controls.update?.();
    }
    primed.current = true;

    const camDone = camera.position.distanceToSquared(camGoal.current) < 1e-6;
    const tgtDone = !controls?.target || controls.target.distanceToSquared(target.current) < 1e-6;
    if (camDone && tgtDone) {
      animatingRef.current = false;
    } else {
      invalidate();
    }
  });

  return null;
}

function BreathRig({ groupRef, enabled, baseScaleRef, animatingRef }) {
  useFrame(({ clock }) => {
    if (!enabled) return;
    const g = groupRef.current;
    if (!g) return;
    const base = baseScaleRef.current || g.scale.x || 1;
    const breath = 1 + Math.sin(clock.elapsedTime * 1.15) * 0.004;
    g.scale.setScalar(base * breath);
    if (!animatingRef.current) invalidate();
  });
  return null;
}

function VisibilityPause({ pausedRef }) {
  useEffect(() => {
    const onVis = () => {
      pausedRef.current = document.hidden;
      if (!document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [pausedRef]);
  return null;
}

/** Keep damping alive under frameloop="demand". */
function ControlsPump({ pausedRef, camAnimatingRef, breathEnabled }) {
  const dragging = useRef(false);
  const controls = useThree((s) => s.controls);

  useEffect(() => {
    if (!controls) return undefined;
    const onStart = () => {
      dragging.current = true;
      invalidate();
    };
    const onEnd = () => {
      dragging.current = false;
      invalidate();
    };
    controls.addEventListener?.("start", onStart);
    controls.addEventListener?.("end", onEnd);
    return () => {
      controls.removeEventListener?.("start", onStart);
      controls.removeEventListener?.("end", onEnd);
    };
  }, [controls]);

  useFrame(() => {
    if (pausedRef.current) return;
    if (dragging.current || camAnimatingRef.current || breathEnabled) {
      controls?.update?.();
      invalidate();
    }
  });

  return null;
}

function PerfProbe({ onStats, token }) {
  const { scene } = useThree();
  useEffect(() => {
    const measure = () => {
      let meshes = 0;
      let tris = 0;
      let visibleMeshes = 0;
      const mats = new Set();
      scene.traverse((o) => {
        if (!o.isMesh) return;
        meshes += 1;
        let vis = o.visible;
        let p = o.parent;
        while (p && vis) {
          if (p.visible === false) vis = false;
          p = p.parent;
        }
        if (vis) {
          visibleMeshes += 1;
          const geo = o.geometry;
          if (geo?.index) tris += geo.index.count / 3;
          else if (geo?.attributes?.position) tris += geo.attributes.position.count / 3;
        }
        if (o.material) mats.add(o.material.uuid);
      });
      onStats?.({
        meshes,
        visibleMeshes,
        triangles: Math.round(tris),
        materials: mats.size,
      });
    };
    measure();
    const id = window.setInterval(measure, 2000);
    return () => window.clearInterval(id);
  }, [scene, onStats, token]);
  return null;
}

function AtlasScene({
  mode,
  hotId,
  focusId,
  huntTarget,
  onSelect,
  onHover,
  onReady,
  onAvailable,
  onStats,
  resetToken,
  breathe,
  tier,
  qualityOpts,
}) {
  const atlasGroup = useRef();
  const rootsRef = useRef({});
  const meshIndex = useRef(new Map());
  const fitted = useRef(false);
  const baseScaleRef = useRef(1);
  const camAnimating = useRef(false);
  const pausedRef = useRef(false);
  const [focusPoint, setFocusPoint] = useState(null);
  const [version, setVersion] = useState(0);
  const [mountedSystems, setMountedSystems] = useState(() =>
    systemsForMode("organs", qualityOpts)
  );

  // Ensure demand-mode canvas keeps ticking until first systems are mounted
  useEffect(() => {
    invalidate();
    const id = window.setInterval(() => invalidate(), 250);
    const stop = window.setTimeout(() => window.clearInterval(id), 15000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(stop);
    };
  }, []);

  const activeSystems = useMemo(() => {
    const base = new Set(systemsForMode(mode, qualityOpts));
    for (const s of systemsForFocus(focusId)) base.add(s);
    for (const s of systemsForFocus(huntTarget)) base.add(s);
    return [...base];
  }, [mode, focusId, huntTarget, qualityOpts]);

  // Lazily mount systems; never unmount (cache). Toggle visibility instead.
  useEffect(() => {
    setMountedSystems((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const s of activeSystems) {
        if (!next.has(s)) {
          next.add(s);
          changed = true;
        }
      }
      return changed ? [...next] : prev;
    });
  }, [activeSystems]);

  const rebuildIndex = useCallback(() => {
    const byOrgan = new Map();
    Object.values(rootsRef.current).forEach((r) => {
      if (!r || !r.visible) return;
      r.traverse((child) => {
        if (!child.isMesh || !child.userData.organId) return;
        const id = child.userData.organId;
        if (!byOrgan.has(id)) byOrgan.set(id, []);
        byOrgan.get(id).push(child);
      });
    });
    meshIndex.current = byOrgan;
    onAvailable?.([...byOrgan.keys()]);
  }, [onAvailable]);

  const fitIfNeeded = useCallback(() => {
    const group = atlasGroup.current;
    if (!group || fitted.current) return;
    const hasPrimary =
      rootsRef.current.visceral ||
      rootsRef.current.skeleton ||
      Object.keys(rootsRef.current).length > 0;
    if (!hasPrimary) return;

    group.position.set(0, 0, 0);
    group.scale.setScalar(1);
    const box = new THREE.Box3().setFromObject(group);
    if (box.isEmpty()) return;
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_HEIGHT / Math.max(size.y, 0.001);
    group.scale.setScalar(scale);
    group.position.copy(center).multiplyScalar(-scale);
    baseScaleRef.current = scale;
    fitted.current = true;
    onReady?.();
    setVersion((v) => v + 1);
    invalidate();
  }, [onReady]);

  const onRoot = useCallback(
    (systemId, root) => {
      if (root) rootsRef.current[systemId] = root;
      else delete rootsRef.current[systemId];
      rebuildIndex();
      requestAnimationFrame(() => fitIfNeeded());
    },
    [rebuildIndex, fitIfNeeded]
  );

  useEffect(() => {
    rebuildIndex();
    invalidate();
  }, [mode, activeSystems, rebuildIndex]);

  useEffect(() => {
    if (!focusId) {
      setFocusPoint(null);
      return;
    }
    const meshes = meshIndex.current.get(focusId);
    if (!meshes?.length) {
      setFocusPoint(null);
      return;
    }
    const box = new THREE.Box3();
    meshes.forEach((m) => {
      m.updateWorldMatrix(true, false);
      box.expandByObject(m);
    });
    if (!box.isEmpty()) setFocusPoint(box.getCenter(new THREE.Vector3()));
  }, [focusId, version, mountedSystems]);

  const lastHover = useRef(null);
  const onPointer = useCallback(
    (e) => {
      e.stopPropagation();
      const organId = e.object?.userData?.organId;
      if (!organId) return;

      if (e.type === "click") {
        onSelect?.(organId);
        invalidate();
        return;
      }

      if (e.type === "pointermove") {
        if (lastHover.current === organId) return;
        lastHover.current = organId;
        onHover?.(organId);
        invalidate();
      }
    },
    [onHover, onSelect]
  );

  const allowBreath = false; // disabled until interaction is rock-solid; scale stay static

  return (
    <>
      <color attach="background" args={["#05080e"]} />
      <fog attach="fog" args={["#05080e", 4.2, 9]} />
      <hemisphereLight args={["#c5d8e8", "#1a1512", 0.55]} />
      <directionalLight position={[2.4, 4, 2]} intensity={1.05} />

      <group
        ref={atlasGroup}
        onClick={onPointer}
        onPointerMove={onPointer}
        onPointerOut={() => {
          if (lastHover.current) {
            lastHover.current = null;
            onHover?.(null);
          }
        }}
      >
        {mountedSystems.map((systemId) => (
          <Suspense key={systemId} fallback={null}>
            <AtlasLayer
              systemId={systemId}
              state={
                activeSystems.includes(systemId)
                  ? visibilityFor(mode, systemId, qualityOpts)
                  : "hidden"
              }
              onRoot={onRoot}
              focusId={focusId}
              hotId={hotId}
              tier={tier}
              mode={mode}
            />
          </Suspense>
        ))}
      </group>

      {/* BreathRig intentionally off — continuous scale animation forced 60fps renders */}
      <BreathRig
        groupRef={atlasGroup}
        enabled={allowBreath}
        baseScaleRef={baseScaleRef}
        animatingRef={camAnimating}
      />

      <OrbitControls
        makeDefault
        enablePan
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={tier === "low" ? 0.7 : 0.9}
        zoomSpeed={0.85}
        panSpeed={0.7}
        minDistance={0.4}
        maxDistance={5.5}
        maxPolarAngle={Math.PI * 0.92}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        onChange={() => invalidate()}
      />
      <CameraRig focusPoint={focusPoint} resetToken={resetToken} animatingRef={camAnimating} />
      <ControlsPump
        pausedRef={pausedRef}
        camAnimatingRef={camAnimating}
        breathEnabled={false}
      />
      <VisibilityPause pausedRef={pausedRef} />
      {onStats && <PerfProbe onStats={onStats} token={`${mode}-${mountedSystems.join(",")}`} />}
    </>
  );
}

function AtlasErrorUI({ error, onRetry }) {
  return (
    <div className="bw-atlas-error" role="alert">
      <h2 className="bw-display">Anatomy model unavailable</h2>
      <p>
        BodyWise will not invent organ positions. The anatomical atlas failed to load, so the viewer
        is hidden instead of showing incorrect anatomy.
      </p>
      <p className="bw-atlas-error__detail">{error?.message || "Unknown load error"}</p>
      <button type="button" className="bw-chip is-on" onClick={onRetry}>
        Retry
      </button>
      <p className="bw-atlas-error__note">
        Requires WebGL and files in <code>/bodywise/models/atlas/</code>
      </p>
    </div>
  );
}

function UnavailableOrganNotice({ focusId, available }) {
  if (!focusId || !ORGANS[focusId]) return null;
  if (available?.includes(focusId)) return null;
  return (
    <div className="bw-atlas-missing">
      <strong>{ORGANS[focusId].name}</strong> is not available in loaded atlas layers — hidden, not
      faked.
    </div>
  );
}

function LoadProgress() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="bw-atlas-loader is-active" role="status">
      <div className="bw-atlas-loader__bar">
        <span style={{ width: `${Math.round(progress)}%` }} />
      </div>
      <p>Loading anatomical system… {Math.round(progress)}%</p>
      <p className="bw-atlas-loader__note">On-demand · cached after first load</p>
    </div>
  );
}

export default function LivingBody({
  mode,
  hotId,
  focusId,
  layout,
  force2D = false,
  huntTarget = null,
  breathe = true,
  onHover,
  onSelect,
  onAvailableOrgans,
}) {
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState([]);
  const [resetToken, setResetToken] = useState(0);
  const [retryKey, setRetryKey] = useState(0);
  const [perf, setPerf] = useState(null);

  const device = useMemo(() => detectDeviceTier(), []);
  const tier =
    layout === "mobile" && device.tier === "high" ? "medium" : device.tier;
  const dpr = useMemo(() => pixelRatioForTier(tier, layout === "mobile"), [tier, layout]);
  const qualityOpts = useMemo(
    () => ({
      tier,
      // Skeleton ghost refs are expensive (full transparent pass) — off until LODs exist
      allowSkeletonRef: false,
    }),
    [tier]
  );

  useEffect(() => {
    onAvailableOrgans?.(available);
  }, [available, onAvailableOrgans]);

  useEffect(() => {
    if (!perf || typeof window === "undefined") return;
    window.__BODYWISE_PERF__ = { ...perf, tier, dpr, mode };
  }, [perf, tier, dpr, mode]);

  if (force2D) {
    return (
      <AtlasErrorUI
        error={new Error("WebGL unavailable. Incorrect 2D organ placeholders are disabled.")}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (error) {
    return (
      <AtlasErrorUI
        error={error}
        onRetry={() => {
          setError(null);
          setReady(false);
          setRetryKey((k) => k + 1);
        }}
      />
    );
  }

  return (
    <div className="bw-living" data-tier={tier}>
      <UnavailableOrganNotice focusId={focusId} available={available} />
      {!ready && (
        <div className="bw-atlas-loader is-active" role="status">
          <div className="bw-atlas-loader__bar">
            <span style={{ width: "28%" }} />
          </div>
          <p>Loading body…</p>
          <p className="bw-atlas-loader__note">
            {tier === "low" ? "Performance mode · lighter systems" : "Default organs only · other systems on demand"}
          </p>
        </div>
      )}
      <LoadProgress />
      <div className="bw-living__canvas">
        <AtlasErrorBoundary
          key={retryKey}
          fallback={(err) => (
            <AtlasErrorUI
              error={err}
              onRetry={() => {
                setError(err);
                setRetryKey((k) => k + 1);
              }}
            />
          )}
        >
          <Canvas
            shadows={false}
            dpr={dpr}
            frameloop="demand"
            camera={{ position: [0, 0.32, 2.35], fov: 40, near: 0.05, far: 80 }}
            gl={{
              antialias: tier !== "low",
              powerPreference: tier === "low" ? "low-power" : "high-performance",
              alpha: false,
              stencil: false,
              depth: true,
            }}
            onCreated={({ gl, invalidate: inv }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.02;
              gl.setPixelRatio(dpr);
              // Critical: demand mode must paint once or Suspense/useFBX never starts
              inv();
              requestAnimationFrame(() => inv());
            }}
            onPointerMissed={() => onHover?.(null)}
          >
            <Suspense fallback={null}>
              <AtlasScene
                mode={mode}
                hotId={hotId}
                focusId={focusId}
                huntTarget={huntTarget}
                resetToken={resetToken}
                breathe={breathe && tier !== "low"}
                tier={tier}
                qualityOpts={qualityOpts}
                onHover={onHover}
                onSelect={(id) => {
                  if (huntTarget && id === huntTarget) onSelect?.(id, { huntHit: true });
                  else onSelect?.(id);
                }}
                onAvailable={setAvailable}
                onReady={() => setReady(true)}
                onStats={setPerf}
              />
            </Suspense>
          </Canvas>
        </AtlasErrorBoundary>
      </div>
      <div className="bw-living__tools">
        <button
          type="button"
          className="bw-glass-chip"
          onClick={() => {
            setResetToken((t) => t + 1);
            onSelect?.(null);
          }}
        >
          Reset
        </button>
        {hotId && ORGANS[hotId] && <span className="bw-living__hot">{ORGANS[hotId].name}</span>}
        {perf && tier === "high" && (
          <span className="bw-living__perf" title="Live mesh budget">
            {(perf.triangles / 1000).toFixed(0)}k tris
          </span>
        )}
      </div>
    </div>
  );
}
