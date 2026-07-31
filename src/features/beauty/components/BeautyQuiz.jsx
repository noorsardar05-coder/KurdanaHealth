import { useState } from "react";
import { motion } from "framer-motion";
import { QUIZ_STEPS } from "../i18n/beautyStrings.js";

export default function BeautyQuiz({ t, step, answers, onSelect, onNext, onBack, onFinish, completed }) {
  if (completed) {
    return (
      <div className="bt-onboard">
        <motion.div className="bt-onboard__card glass" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <p style={{ fontSize: "2rem", margin: "0 0 0.5rem" }}>✨</p>
          <h1 className="bt-onboard__title">{t("quizDone")}</h1>
          <p style={{ color: "var(--bt-mauve)", margin: "0 0 1.5rem" }}>{t("quizDoneSub")}</p>
          <button type="button" className="bt-hero-cta" onClick={onFinish}>
            {t("enterStudio")}
          </button>
        </motion.div>
      </div>
    );
  }

  const current = QUIZ_STEPS[step];
  const selected = answers[current.id];

  return (
    <div className="bt-onboard">
      <motion.div
        key={step}
        className="bt-onboard__card glass"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ maxWidth: 480, textAlign: "start" }}
      >
        <p style={{ fontSize: "1.75rem", margin: "0 0 0.5rem" }}>{current.emoji}</p>
        <h2 className="bt-onboard__title" style={{ fontSize: "1.35rem" }}>{t(current.questionKey)}</h2>
        <div style={{ margin: "1.25rem 0" }}>
          {current.options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`bt-quiz-option ${selected === opt.value ? "is-selected" : ""}`}
              onClick={() => onSelect(current.id, opt.value)}
            >
              {t(opt.labelKey)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {step > 0 && (
            <button type="button" className="bt-routine-tab" onClick={onBack}>
              ←
            </button>
          )}
          <button
            type="button"
            className="bt-hero-cta"
            style={{ flex: 1, justifyContent: "center" }}
            disabled={!selected}
            onClick={onNext}
          >
            {step < QUIZ_STEPS.length - 1 ? "→" : "✓"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
