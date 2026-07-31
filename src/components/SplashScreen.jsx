import { useEffect, useState } from "react";

const FADE_MS = 1000;
const HOLD_MS = 1750;

export default function SplashScreen({ onComplete }) {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    const tExit = setTimeout(() => setExiting(true), FADE_MS + HOLD_MS);
    const tDone = setTimeout(
      () => onComplete?.(),
      FADE_MS + HOLD_MS + FADE_MS
    );
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [onComplete]);

  const motion = exiting
    ? "scale-[1.03] opacity-0"
    : entered
      ? "scale-100 opacity-100"
      : "scale-95 opacity-0";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-pastel-pink via-pastel-bg to-pastel-blue"
      aria-hidden="true"
    >
      <div
        className={`transform text-center transition-all duration-1000 ease-out ${motion}`}
      >
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
          KURDANA HEALTH
        </h1>
        <p className="mt-4 text-lg font-medium text-slate-600 sm:text-xl">
          by Noor Sardar
        </p>
      </div>
    </div>
  );
}
