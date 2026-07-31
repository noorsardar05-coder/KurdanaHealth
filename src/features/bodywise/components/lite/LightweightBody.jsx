import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import BodySvg from "./BodySvg.jsx";
import { LITE_ORGAN_IDS, LITE_ORGANS } from "../../data/organLessons.js";

function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en;
}

/**
 * Fast 2.5D layered body — default BodyWise experience.
 * No FBX, no WebGL required.
 */
export default function LightweightBody({
  mode,
  focusId,
  lang = "en",
  onSelectOrgan,
  onAvailableOrgans,
  alive = true,
}) {
  const [side, setSide] = useState("front");
  const [hotId, setHotId] = useState(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    onAvailableOrgans?.(LITE_ORGAN_IDS);
  }, [onAvailableOrgans]);

  const onHover = useCallback((id) => setHotId(id), []);

  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    onSelectOrgan?.(null);
  };

  const onPointerDown = (e) => {
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) drag.current.moved = true;
    setPan({ x: drag.current.panX + dx, y: drag.current.panY + dy });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const toggleFullscreen = () => {
    const el = stageRef.current;
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const label = hotId && LITE_ORGANS[hotId] ? t(LITE_ORGANS[hotId].name, lang) : null;

  return (
    <div className={`bw-lite ${focusId ? "is-focused" : ""}`} ref={stageRef}>
      <div
        className="bw-lite__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={(e) => {
          e.preventDefault();
          setScale((s) => Math.min(2.4, Math.max(0.7, s - e.deltaY * 0.0015)));
        }}
      >
        <div
          className="bw-lite__parallax"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          }}
        >
          <BodySvg
            side={side}
            mode={mode}
            hotId={hotId}
            focusId={focusId}
            breathe={alive && !focusId}
            onHover={onHover}
            onSelect={(id) => {
              if (drag.current?.moved) return;
              onSelectOrgan?.(id);
            }}
          />
        </div>
      </div>

      {label && !focusId && <div className="bw-hot-label">{label}</div>}

      <div className="bw-lite__tools">
        <button
          type="button"
          className="bw-glass-chip"
          onClick={() => setSide((s) => (s === "front" ? "back" : "front"))}
        >
          {side === "front" ? (lang === "ku" ? "پشت" : "Back") : lang === "ku" ? "پێشەوە" : "Front"}
        </button>
        <button
          type="button"
          className="bw-glass-chip"
          onClick={() => setScale((s) => Math.min(2.4, s + 0.15))}
          aria-label="Zoom in"
        >
          <ZoomIn size={14} />
        </button>
        <button
          type="button"
          className="bw-glass-chip"
          onClick={() => setScale((s) => Math.max(0.7, s - 0.15))}
          aria-label="Zoom out"
        >
          <ZoomOut size={14} />
        </button>
        <button type="button" className="bw-glass-chip" onClick={resetView} aria-label="Reset">
          <RotateCcw size={14} />
        </button>
        <button type="button" className="bw-glass-chip" onClick={toggleFullscreen} aria-label="Fullscreen">
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
