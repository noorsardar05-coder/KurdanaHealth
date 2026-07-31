import { useEffect, useRef } from "react";
import { detectDeviceTier } from "../utils/deviceTier.js";

/** Soft floating dust — paused on low-tier / hidden tabs. Pointer-events none. */
export default function Particles({ enabled = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return undefined;

    const { tier } = detectDeviceTier();
    if (tier === "low") return undefined;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let w = 0;
    let h = 0;
    let last = 0;
    const count = tier === "medium" ? 16 : 28;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.2,
      s: 0.08 + Math.random() * 0.2,
      a: 0.12 + Math.random() * 0.28,
    }));

    function resize() {
      const parent = canvas.parentElement;
      w = parent?.clientWidth || window.innerWidth;
      h = parent?.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now) {
      if (document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      // ~30fps
      if (now - last < 33) {
        raf = requestAnimationFrame(tick);
        return;
      }
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s * 0.0015;
        d.x += Math.sin(d.y * 12 + d.r) * 0.00015;
        if (d.y < -0.02) {
          d.y = 1.02;
          d.x = Math.random();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 210, 230, ${d.a})`;
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={ref} className="bw-particles" aria-hidden="true" />;
}
