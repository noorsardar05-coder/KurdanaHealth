import { Suspense, lazy, useEffect, useState } from "react";
import { detectDeviceTier } from "../utils/deviceTier.js";

const LivingBody = lazy(() => import("./LivingBody.jsx"));

const ATLAS_SIZE_HINT = "~170 MB";
const LOAD_TIMEOUT_MS = 8000;

/**
 * Optional heavy 3D atlas — never loads until the user confirms.
 */
export default function Advanced3DGate({
  lang,
  mode,
  hotId,
  focusId,
  layout,
  onSelect,
  onHover,
  onAvailableOrgans,
  onExitToLite,
}) {
  const [phase, setPhase] = useState("ask"); // ask | loading | ready | timeout | error
  const [tier] = useState(() => detectDeviceTier());

  useEffect(() => {
    if (phase !== "loading") return undefined;
    const t = window.setTimeout(() => {
      setPhase((p) => (p === "loading" ? "timeout" : p));
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === "ask") {
    return (
      <div className="bw-adv-gate" role="dialog" aria-modal="true">
        <h2 className="bw-display">
          {lang === "ku" ? "٣ی دی پێشکەوتوو" : "Advanced 3D"}
        </h2>
        <p>
          {lang === "ku"
            ? `ئەم مۆدێلە قورسە (~${ATLAS_SIZE_HINT}). تەنها بۆ ئامێری بەهێز.`
            : `This model is heavy (${ATLAS_SIZE_HINT}). Best on powerful devices.`}
        </p>
        <p className="bw-adv-gate__meta">
          {lang === "ku" ? "ئامێر" : "Device"}: {tier.tier} · {tier.cores} cores
        </p>
        <div className="bw-adv-gate__actions">
          <button type="button" className="bw-glass-chip is-on" onClick={() => setPhase("loading")}>
            {lang === "ku" ? "بارکردن" : "Load Advanced 3D"}
          </button>
          <button type="button" className="bw-glass-chip" onClick={onExitToLite}>
            {lang === "ku" ? "مۆدی سووک" : "Lightweight Mode"}
          </button>
        </div>
      </div>
    );
  }

  if (phase === "timeout" || phase === "error") {
    return (
      <div className="bw-adv-gate" role="alert">
        <h2 className="bw-display">
          {lang === "ku" ? "مۆدێلەکە زۆر قورسە" : "This model is too heavy"}
        </h2>
        <p>
          {lang === "ku"
            ? "بۆ ئەم ئامێرە. بەردەوامبە لە مۆدی سووک."
            : "for this device. Continue in Lightweight Mode."}
        </p>
        <div className="bw-adv-gate__actions">
          <button type="button" className="bw-glass-chip is-on" onClick={onExitToLite}>
            {lang === "ku" ? "مۆدی سووک" : "Use Lightweight Mode"}
          </button>
          <button type="button" className="bw-glass-chip" onClick={() => setPhase("loading")}>
            {lang === "ku" ? "دووبارە هەوڵ بدە" : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bw-adv-wrap">
      <button type="button" className="bw-glass-chip bw-adv-exit" onClick={onExitToLite}>
        {lang === "ku" ? "← مۆدی سووک" : "← Lightweight Mode"}
      </button>
      <Suspense
        fallback={
          <div className="bw-atlas-loader is-active" role="status">
            <div className="bw-atlas-loader__bar">
              <span style={{ width: "40%" }} />
            </div>
            <p>{lang === "ku" ? "بارکردنی ٣ی دی…" : "Loading Advanced 3D…"}</p>
            <p className="bw-atlas-loader__note">
              {lang === "ku" ? "ئەگەر درەنگ بوو، مۆدی سووک هەڵبژێرە" : "If this stalls, switch to Lightweight Mode"}
            </p>
            <button type="button" className="bw-glass-chip" onClick={onExitToLite}>
              {lang === "ku" ? "مۆدی سووک" : "Lightweight Mode"}
            </button>
          </div>
        }
      >
        <LivingBody
          mode={mode}
          hotId={hotId}
          focusId={focusId}
          layout={layout}
          breathe={false}
          onHover={onHover}
          onSelect={onSelect}
          onAvailableOrgans={(ids) => {
            setPhase("ready");
            onAvailableOrgans?.(ids);
          }}
        />
      </Suspense>
    </div>
  );
}
