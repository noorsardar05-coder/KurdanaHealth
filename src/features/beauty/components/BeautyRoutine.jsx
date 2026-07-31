import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { getRoutineProducts } from "../data/beautyRecommendations.js";

function buildSteps(profile, products, period, t) {
  const base = {
    morning: [
      { key: "cleanser", title: t("stepCleanse"), product: products.cleanser, min: 2 },
      { key: "toner", title: t("stepTone"), product: products.toner, min: 1 },
      { key: "serum", title: t("stepSerum"), product: products.serum, min: 1 },
      { key: "moisturizer", title: t("stepMoist"), product: products.moisturizer, min: 2 },
      { key: "sunscreen", title: t("stepSpf"), product: products.sunscreen, min: 1 },
    ],
    evening: [
      { key: "eve-cleanse", title: t("stepNightCleanse"), product: products.cleanser, min: 2 },
      { key: "eve-serum", title: t("stepNightSerum"), product: products.serum, min: 1 },
      { key: "eve-moist", title: t("stepNightCream"), product: products.moisturizer, min: 2 },
    ],
    weekly: [
      { key: "mask", title: t("stepMask"), product: products.serum, min: 15 },
      { key: "exfoliate", title: t("stepExfoliate"), product: products.toner, min: 5 },
    ],
  };
  if (profile?.routineLevel === "minimal") {
    base.morning = base.morning.slice(0, 3);
    base.evening = base.evening.slice(0, 2);
  }
  return base[period] || [];
}

export default function BeautyRoutine({ t, profile, progress, onProgressChange }) {
  const [period, setPeriod] = useState("morning");
  const products = getRoutineProducts(profile);
  const steps = buildSteps(profile, products, period, t);
  const done = progress?.[period] || {};
  const estTotal = steps.reduce((sum, s) => sum + s.min, 0);

  const toggleStep = (key) => {
    const next = { ...done, [key]: !done[key] };
    const allDone = steps.every((s) => next[s.key]);
    let streak = progress.streak || 0;
    const today = new Date().toISOString().slice(0, 10);
    if (allDone && progress.lastDate !== today) {
      streak += 1;
    }
    onProgressChange({
      ...progress,
      [period]: next,
      streak: allDone ? streak : progress.streak,
      lastDate: allDone ? today : progress.lastDate,
    });
  };

  const completed = steps.filter((s) => done[s.key]).length;
  const allComplete = completed === steps.length && steps.length > 0;

  return (
    <section id="beauty-routine" className="bt-section">
      <div className="bt-section-head">
        <div>
          <h2 className="bt-section-title">{t("navRoutine")}</h2>
          <p className="bt-section-sub">
            ✦ {progress.streak || 0} {t("streakDays")}
          </p>
        </div>
        <div className="bt-est-pill">
          ~{estTotal} {t("estTime")}
        </div>
      </div>

      <div className="bt-routine-tabs" role="tablist">
        {[
          { id: "morning", label: t("morning") },
          { id: "evening", label: t("night") },
          { id: "weekly", label: t("weekly") },
        ].map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={period === p.id}
            className={`bt-routine-tab ${period === p.id ? "is-active" : ""}`}
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={period}
          className="bt-routine-list"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
        >
          {steps.map((step, i) => {
            const isDone = !!done[step.key];
            return (
              <motion.button
                key={step.key}
                type="button"
                className={`bt-step-card bt-step-card--interactive ${isDone ? "is-done" : ""}`}
                onClick={() => toggleStep(step.key)}
                whileTap={{ scale: 0.985 }}
              >
                <span className={`bt-step-card__num ${isDone ? "is-check" : ""}`}>
                  {isDone ? <Check size={16} strokeWidth={2.5} /> : i + 1}
                </span>
                {step.product?.image && (
                  <img src={step.product.image} alt="" className="bt-step-card__img" />
                )}
                <div className="bt-step-card__copy">
                  <p className="bt-step-card__title">{step.title}</p>
                  <p className="bt-step-card__meta">
                    {step.product?.name || t("yourPick")} · {step.min} {t("estTime")}
                  </p>
                </div>
                <span className="bt-step-card__action">{isDone ? t("done") : t("markDone")}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {allComplete && (
        <motion.div
          className="bt-complete-banner"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {t("routineComplete")}
        </motion.div>
      )}
    </section>
  );
}
