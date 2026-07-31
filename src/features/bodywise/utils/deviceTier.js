/** Classify device so BodyWise can shed GPU cost on weak hardware. */

export function detectDeviceTier() {
  if (typeof window === "undefined") {
    return { tier: "medium", isMobile: false, cores: 4, memoryGB: 4 };
  }

  const ua = navigator.userAgent || "";
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
    (window.matchMedia?.("(pointer: coarse)").matches && window.innerWidth < 1024);

  const cores = navigator.hardwareConcurrency || 4;
  const memoryGB = navigator.deviceMemory || (isMobile ? 2 : 4);
  const saveData = navigator.connection?.saveData === true;
  const slowNet = /2g|slow-2g/i.test(navigator.connection?.effectiveType || "");

  let tier = "high";
  if (saveData || slowNet || memoryGB <= 2 || cores <= 2 || (isMobile && cores <= 4)) {
    tier = "low";
  } else if (isMobile || memoryGB <= 4 || cores <= 4) {
    tier = "medium";
  }

  return { tier, isMobile, cores, memoryGB };
}

export function pixelRatioForTier(tier, isMobile) {
  const dpr = window.devicePixelRatio || 1;
  if (tier === "low") return Math.min(dpr, 1);
  if (tier === "medium" || isMobile) return Math.min(dpr, 1.25);
  return Math.min(dpr, 1.75);
}
