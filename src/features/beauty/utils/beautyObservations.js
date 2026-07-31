/**
 * Safe educational visual observations from face-region samples.
 * Descriptive levels only — never medical labels or attractiveness scores.
 */
import { FACE_REGIONS, estimateHeadPose, landmarksBounds } from "./faceLandmarker.js";
import {
  assessCaptureQuality,
  canvasFromSource,
  estimateBlurVariance,
  estimateBrightnessContrast,
  getImageData,
  sampleRegionStats,
} from "./imageQuality.js";

function levelFromShine(tzoneLum, cheekLum) {
  if (tzoneLum == null || cheekLum == null) return "unable";
  const delta = tzoneLum - cheekLum;
  if (delta < 6) return "low";
  if (delta < 16) return "moderate";
  return "high";
}

function levelFromRedness(score) {
  if (score == null) return "unable";
  if (score < 8) return "notVisible";
  if (score < 18) return "slight";
  if (score < 30) return "moderate";
  return "clear";
}

function levelFromShadow(underEyeLum, cheekLum) {
  if (underEyeLum == null || cheekLum == null) return "unable";
  const delta = cheekLum - underEyeLum;
  if (delta < 8) return "notVisible";
  if (delta < 18) return "slight";
  if (delta < 30) return "moderate";
  return "moderate"; // stay cautious — never “severe”
}

function levelFromTexture(texture, contrast) {
  if (texture == null) return "unable";
  // Normalize roughly against global contrast
  const score = texture / Math.max(8, contrast * 0.15);
  if (score < 0.85) return "smooth";
  if (score < 1.35) return "some";
  return "more";
}

function levelFromDrynessHint(texture, sat, lum) {
  // Only flag when high micro-contrast + lower saturation — still cautious
  if (texture == null || sat == null || lum == null) return "unable";
  if (lum > 175 && texture > 22 && sat < 0.18) return "slight";
  if (lum > 160 && texture > 30 && sat < 0.15) return "moderate";
  return "unable";
}

function levelFromTone(regions) {
  const lums = regions.filter(Boolean).map((r) => r.lum);
  if (lums.length < 3) return "unable";
  const mean = lums.reduce((a, b) => a + b, 0) / lums.length;
  let v = 0;
  for (const l of lums) v += (l - mean) ** 2;
  v = Math.sqrt(v / lums.length);
  if (v < 10) return "notVisible";
  if (v < 18) return "slight";
  if (v < 28) return "moderate";
  return "moderate";
}

function confidenceFromQuality(quality, regionOk) {
  if (!quality.pass) return "low";
  const { metrics } = quality;
  let score = 0;
  if (metrics.blurVar > 40) score += 2;
  else if (metrics.blurVar > 12) score += 1;
  if (metrics.brightness > 45 && metrics.brightness < 200) score += 2;
  else if (metrics.brightness > 28 && metrics.brightness < 225) score += 1;
  if (metrics.centering > 0.45) score += 1;
  if (Math.abs(metrics.yaw || 0) < 0.22) score += 1;
  if (regionOk) score += 1;
  if (score >= 5) return "high";
  if (score >= 2) return "moderate";
  return "low";
}

/**
 * Analyze a captured still (HTMLImageElement | HTMLCanvasElement | HTMLVideoElement frame already drawn).
 * Returns either blockers or observations — never invents results when face/quality fails.
 */
export async function analyzeBeautyCapture(source, detectFacesInImage) {
  const { canvas, ctx, width, height } = canvasFromSource(source);
  const imageData = getImageData(ctx, width, height);
  const { brightness, contrast } = estimateBrightnessContrast(imageData);
  const blurVar = estimateBlurVariance(imageData);

  let detection;
  try {
    detection = await detectFacesInImage(canvas);
  } catch (err) {
    return {
      ok: false,
      error: "landmarkerFailed",
      message: err?.message || String(err),
      quality: null,
      observations: [],
    };
  }

  const primary = detection.primary;
  const bounds = primary ? landmarksBounds(primary) : null;
  const pose = primary ? estimateHeadPose(primary) : { yaw: 0, pitch: 0, ok: false };

  const leftCheek = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.leftCheek)
    : null;
  const rightCheek = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.rightCheek)
    : null;
  const tzone = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.noseTzone)
    : null;
  const forehead = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.foreheadCore)
    : null;
  const underL = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.underLeftEye, 3)
    : null;
  const underR = primary
    ? sampleRegionStats(imageData, primary, FACE_REGIONS.underRightEye, 3)
    : null;

  const quality = assessCaptureQuality({
    brightness,
    contrast,
    blurVar,
    faceCount: detection.faceCount,
    bounds,
    pose,
    leftCheek,
    rightCheek,
  });

  if (!quality.pass) {
    return {
      ok: false,
      error: "quality",
      quality,
      faceCount: detection.faceCount,
      observations: [],
      previewCanvas: canvas,
    };
  }

  const cheekLum =
    leftCheek && rightCheek ? (leftCheek.lum + rightCheek.lum) / 2 : leftCheek?.lum ?? rightCheek?.lum;
  const cheekSat =
    leftCheek && rightCheek ? (leftCheek.sat + rightCheek.sat) / 2 : leftCheek?.sat ?? rightCheek?.sat;
  const cheekTex =
    leftCheek && rightCheek
      ? (leftCheek.texture + rightCheek.texture) / 2
      : leftCheek?.texture ?? rightCheek?.texture;
  const cheekRed =
    leftCheek && rightCheek
      ? (leftCheek.redness + rightCheek.redness) / 2
      : leftCheek?.redness ?? rightCheek?.redness;
  const tzoneLum = tzone && forehead ? (tzone.lum + forehead.lum) / 2 : tzone?.lum ?? forehead?.lum;
  const underEyeLum =
    underL && underR ? (underL.lum + underR.lum) / 2 : underL?.lum ?? underR?.lum;

  const regionOk = Boolean(tzone && (leftCheek || rightCheek));
  const confidence = confidenceFromQuality(quality, regionOk);

  // Low confidence still returns observations — with an honest confidence label (never invent high confidence)
  const shineLevel = levelFromShine(tzoneLum, cheekLum);
  const rednessLevel = levelFromRedness(cheekRed);
  const shadowLevel = levelFromShadow(underEyeLum, cheekLum);
  const textureLevel = levelFromTexture(cheekTex, contrast);
  const drynessLevel = levelFromDrynessHint(cheekTex, cheekSat, cheekLum);
  const toneLevel = levelFromTone([leftCheek, rightCheek, tzone, forehead]);

  const shineSide =
    leftCheek && rightCheek
      ? Math.abs(leftCheek.lum - rightCheek.lum) > 12
        ? leftCheek.lum > rightCheek.lum
          ? "left"
          : "right"
        : "balanced"
      : "unable";

  const observations = [
    {
      id: "shine",
      kind: "shine",
      level: shineLevel,
      confidence,
      meta: { tzoneVsCheek: tzoneLum != null && cheekLum != null ? tzoneLum - cheekLum : null },
    },
    {
      id: "redness",
      kind: "redness",
      level: rednessLevel,
      confidence,
    },
    {
      id: "underEye",
      kind: "underEye",
      level: shadowLevel,
      confidence: confidence === "high" ? "moderate" : confidence, // under-eye is harder
    },
    {
      id: "texture",
      kind: "texture",
      level: textureLevel,
      confidence,
    },
    {
      id: "dryness",
      kind: "dryness",
      level: drynessLevel,
      confidence: drynessLevel === "unable" ? "low" : "moderate",
    },
    {
      id: "tone",
      kind: "tone",
      level: toneLevel,
      confidence,
    },
    {
      id: "lightBalance",
      kind: "lightBalance",
      level: shineSide === "unable" ? "unable" : shineSide === "balanced" ? "balanced" : "uneven",
      confidence,
      meta: { side: shineSide },
    },
  ].filter((o) => o.level !== "unable");

  // Keep 3–6 cards; prefer actionable visual signals
  const prioritized = observations
    .filter((o) => o.level !== "unable")
    .filter((o) => !(o.kind === "dryness" && o.level === "notVisible"))
    .filter((o) => !(o.kind === "redness" && o.level === "notVisible"))
    .slice(0, 6);

  if (prioritized.length < 3) {
    // Include soft “not clearly visible” cards so the panel still teaches honestly
    for (const o of observations) {
      if (prioritized.find((p) => p.id === o.id)) continue;
      prioritized.push(o);
      if (prioritized.length >= 3) break;
    }
  }

  return {
    ok: true,
    quality,
    faceCount: detection.faceCount,
    confidence,
    observations: prioritized.slice(0, 6),
    previewCanvas: canvas,
    routineFocus: deriveRoutineFocus(prioritized),
  };
}

function deriveRoutineFocus(observations) {
  const focus = new Set();
  for (const o of observations) {
    if (o.kind === "shine" && (o.level === "moderate" || o.level === "high")) {
      focus.add("clarity");
      focus.add("balance");
    }
    if (o.kind === "dryness" && (o.level === "slight" || o.level === "moderate")) {
      focus.add("hydration");
      focus.add("barrier");
    }
    if (o.kind === "redness" && (o.level === "slight" || o.level === "moderate" || o.level === "clear")) {
      focus.add("calm");
    }
    if (o.kind === "underEye" && o.level !== "notVisible") {
      focus.add("gentleCare");
    }
    if (o.kind === "texture" && (o.level === "some" || o.level === "more")) {
      focus.add("softPolish");
    }
    if (o.kind === "tone" && (o.level === "slight" || o.level === "moderate")) {
      focus.add("radiance");
    }
  }
  if (!focus.size) focus.add("dailyBasics");
  return [...focus];
}
