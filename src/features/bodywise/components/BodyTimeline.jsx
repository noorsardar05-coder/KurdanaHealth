import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { s } from "../data/ui.js";

export default function BodyTimeline({ timeline, lang }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [timeline.id]);

  useEffect(() => {
    if (step >= timeline.steps.length - 1) return undefined;
    const t = setTimeout(() => setStep((n) => n + 1), 1600);
    return () => clearTimeout(t);
  }, [step, timeline.steps.length]);

  const current = timeline.steps[step];

  return (
    <div className="bw-timeline" style={{ "--tc": timeline.color }}>
      <header className="bw-timeline-head">
        <span>{timeline.icon}</span>
        <div>
          <h3>{timeline.title[lang]}</h3>
          <p>{timeline.subtitle[lang]}</p>
        </div>
      </header>

      <div className="bw-timeline-track">
        {timeline.steps.map((st, i) => (
          <div key={st.title.en} className={`bw-tl-node ${i <= step ? "is-on" : ""}`}>
            <span className="bw-tl-dot">{st.icon}</span>
            <span className="bw-tl-label">{st.title[lang]}</span>
            {i < timeline.steps.length - 1 && <span className="bw-tl-line" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="bw-timeline-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <span className="bw-timeline-big">{current.icon}</span>
          <h4>{current.title[lang]}</h4>
          <p>{current.text[lang]}</p>
          <p className="bw-muted">
            {s(lang, "stepOf", { n: step + 1, t: timeline.steps.length })}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="bw-timeline-controls">
        <button
          type="button"
          className="bw-btn bw-btn-soft"
          disabled={step === 0}
          onClick={() => setStep((n) => Math.max(0, n - 1))}
        >
          {s(lang, "prev")}
        </button>
        <button
          type="button"
          className="bw-btn bw-btn-primary"
          disabled={step >= timeline.steps.length - 1}
          onClick={() => setStep((n) => Math.min(timeline.steps.length - 1, n + 1))}
        >
          {s(lang, "next")}
        </button>
      </div>
    </div>
  );
}
