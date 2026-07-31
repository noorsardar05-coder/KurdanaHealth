/**
 * Image quality + region sampling for educational camera beauty checks.
 * No medical claims — visual heuristics only.
 */

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export function canvasFromSource(source, maxSide = 960) {
  const canvas = document.createElement("canvas");
  const w = source.videoWidth || source.naturalWidth || source.width;
  const h = source.videoHeight || source.naturalHeight || source.height;
  if (!w || !h) throw new Error("empty_image");
  const scale = Math.min(1, maxSide / Math.max(w, h));
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return { canvas, ctx, width: canvas.width, height: canvas.height };
}

export function getImageData(ctx, width, height) {
  return ctx.getImageData(0, 0, width, height);
}

/** Mean luminance 0–255 and simple RMS contrast. */
export function estimateBrightnessContrast(imageData) {
  const { data, width, height } = imageData;
  let sum = 0;
  let sumSq = 0;
  const n = width * height;
  for (let i = 0; i < data.length; i += 4) {
    const y = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    sum += y;
    sumSq += y * y;
  }
  const mean = sum / n;
  const variance = sumSq / n - mean * mean;
  return {
    brightness: mean,
    contrast: Math.sqrt(Math.max(0, variance)),
  };
}

/** Laplacian-style variance on grayscale (higher = sharper). */
export function estimateBlurVariance(imageData) {
  const { data, width, height } = imageData;
  const gray = new Float32Array(width * height);
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    gray[p] = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  }
  let sum = 0;
  let sumSq = 0;
  let count = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const lap =
        -4 * gray[i] +
        gray[i - 1] +
        gray[i + 1] +
        gray[i - width] +
        gray[i + width];
      sum += lap;
      sumSq += lap * lap;
      count++;
    }
  }
  const mean = sum / count;
  return sumSq / count - mean * mean;
}

function samplePoint(imageData, nx, ny) {
  const { data, width, height } = imageData;
  const x = clamp(Math.round(nx * (width - 1)), 0, width - 1);
  const y = clamp(Math.round(ny * (height - 1)), 0, height - 1);
  const i = (y * width + x) * 4;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

export function sampleRegionStats(imageData, landmarks, indices, radiusPx = 4) {
  const { width, height } = imageData;
  const samples = [];
  for (const idx of indices) {
    const p = landmarks[idx];
    if (!p) continue;
    const cx = Math.round(p.x * (width - 1));
    const cy = Math.round(p.y * (height - 1));
    for (let dy = -radiusPx; dy <= radiusPx; dy += 2) {
      for (let dx = -radiusPx; dx <= radiusPx; dx += 2) {
        const x = clamp(cx + dx, 0, width - 1);
        const y = clamp(cy + dy, 0, height - 1);
        const i = (y * width + x) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const sat = (Math.max(r, g, b) - Math.min(r, g, b)) / (Math.max(r, g, b) + 1);
        samples.push({ r, g, b, lum, sat, redness: r - (g + b) / 2 });
      }
    }
  }
  if (!samples.length) return null;
  const avg = (key) => samples.reduce((s, v) => s + v[key], 0) / samples.length;
  const meanLum = avg("lum");
  let varLum = 0;
  for (const s of samples) varLum += (s.lum - meanLum) ** 2;
  varLum /= samples.length;
  return {
    count: samples.length,
    lum: meanLum,
    sat: avg("sat"),
    redness: avg("redness"),
    texture: Math.sqrt(varLum),
  };
}

export function faceSizeRatio(bounds) {
  return bounds.width * bounds.height; // normalized area (0–1 scale product)
}

export function faceCenteringScore(bounds) {
  const cx = (bounds.minX + bounds.maxX) / 2;
  const cy = (bounds.minY + bounds.maxY) / 2;
  const dx = Math.abs(cx - 0.5);
  const dy = Math.abs(cy - 0.48);
  return clamp(1 - (dx * 2.2 + dy * 1.8), 0, 1);
}

export function shadowImbalance(leftCheek, rightCheek) {
  if (!leftCheek || !rightCheek) return null;
  return Math.abs(leftCheek.lum - rightCheek.lum);
}

/**
 * Build quality checklist + blockers from image + face geometry.
 */
export function assessCaptureQuality({
  brightness,
  contrast,
  blurVar,
  faceCount,
  bounds,
  pose,
  leftCheek,
  rightCheek,
}) {
  const checklist = {
    faceDetected: faceCount === 1,
    lighting: brightness >= 28 && brightness <= 225 && contrast >= 8,
    sharp: blurVar >= 10,
    centered: bounds ? faceCenteringScore(bounds) >= 0.35 : false,
    angle: pose?.ok ? Math.abs(pose.yaw) < 0.35 && Math.abs(pose.pitch) < 0.4 : true,
  };

  const blockers = [];
  if (faceCount === 0) blockers.push("noFace");
  else if (faceCount > 1) blockers.push("multiFace");

  if (bounds) {
    const area = faceSizeRatio(bounds);
    if (area < 0.02) blockers.push("tooFar");
    if (area > 0.58) blockers.push("tooClose");
    if (faceCenteringScore(bounds) < 0.22) blockers.push("notCentered");
  }

  if (pose?.ok) {
    if (Math.abs(pose.yaw) >= 0.4 || Math.abs(pose.pitch) >= 0.45) {
      blockers.push("rotated");
    }
  }

  if (brightness < 22) blockers.push("tooDark");
  if (brightness > 238) blockers.push("overexposed");
  if (blurVar < 6) blockers.push("blurry");

  const imbalance = shadowImbalance(leftCheek, rightCheek);
  if (imbalance != null && imbalance > 42 && checklist.lighting) {
    checklist.evenLight = imbalance < 35;
  } else {
    checklist.evenLight = true;
  }
  if (imbalance != null && imbalance > 75) blockers.push("unevenLight");

  const statusFor = (ok) => (ok ? "good" : "needsAdjustment");

  // Hard stop only when analysis is impossible — soft centering/angle become confidence, not a wall
  const hardFail = blockers.some((b) =>
    ["noFace", "multiFace", "tooFar", "tooClose", "tooDark", "overexposed", "blurry"].includes(b),
  );

  return {
    checklist: {
      faceDetected: { ok: checklist.faceDetected, status: statusFor(checklist.faceDetected) },
      lighting: { ok: checklist.lighting, status: statusFor(checklist.lighting) },
      sharp: { ok: checklist.sharp, status: blurVar < 6 ? "tryAgain" : statusFor(checklist.sharp) },
      centered: { ok: checklist.centered, status: statusFor(checklist.centered) },
      angle: { ok: checklist.angle, status: statusFor(checklist.angle) },
    },
    metrics: {
      brightness,
      contrast,
      blurVar,
      faceArea: bounds ? faceSizeRatio(bounds) : 0,
      centering: bounds ? faceCenteringScore(bounds) : 0,
      yaw: pose?.yaw ?? null,
      pitch: pose?.pitch ?? null,
      shadowImbalance: imbalance,
    },
    blockers: [...new Set(blockers)],
    pass: !hardFail && checklist.faceDetected && checklist.lighting && checklist.sharp,
  };
}

export { samplePoint };
