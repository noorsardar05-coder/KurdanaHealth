import { useEffect, useState } from "react";
import { detectDeviceTier } from "../utils/deviceTier.js";

function readViewport() {
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 768;
  const isPortrait = viewportHeight >= viewportWidth;

  let layout = "desktop";
  if (viewportWidth < 480) layout = "mobile";
  else if (viewportWidth < 768) layout = "mobile";
  else if (viewportWidth < 1024) layout = "tablet";
  else if (viewportWidth < 1440) layout = "desktop";
  else layout = "wide";

  const isTouch =
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0);

  const device = detectDeviceTier();

  return {
    layout,
    isTouch,
    isPortrait,
    viewportWidth,
    viewportHeight,
    tier: device.tier,
  };
}

/** Viewport awareness for JS behavior only — prefer CSS for styling. */
export default function useResponsiveBodyWise() {
  const [state, setState] = useState(() => readViewport());

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setState(readViewport()));
    };

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener?.("change", update);

    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      mq.removeEventListener?.("change", update);
    };
  }, []);

  return state;
}

export function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
