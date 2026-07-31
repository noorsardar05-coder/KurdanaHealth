import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUIZ_STEPS } from "../i18n/fitnessStrings.js";

const STEP_ICONS = {
  goal: "🎯",
  level: "📊",
  time: "⏱",
  equipment: "🏋️",
  bodyArea: "🧍",
  energy: "⚡",
  limitations: "🛡",
  style: "✨",
};

const OPTION_EMOJIS = {
  weight_loss: "🔥",
  muscle_gain: "💪",
  flexibility: "🧘",
  stamina: "🏃",
  general_health: "💚",
  beginner: "🌱",
  intermediate: "⚡",
  advanced: "🏆",
  "5": "⚡",
  "10": "🕐",
  "20": "⏱",
  "30": "🕧",
  "45": "🕐",
  none: "🏠",
  dumbbells: "🏋️",
  band: "🎗",
  mat: "🧘",
  chair: "🪑",
  full_body: "🧍",
  core: "🎯",
  legs: "🦵",
  arms: "💪",
  back: "🔙",
  glutes: "🍑",
  cardio: "❤️",
  tired: "😴",
  normal: "😌",
  strong: "😊",
  knee_pain: "🦵",
  back_pain: "🔙",
  pregnancy_safe: "🤰",
  low_impact: "🌿",
  no_jumping: "🚫",
  calm: "🌊",
  intense: "🔥",
  guided: "🎯",
  quick_burn: "⚡",
  stretching: "🧘",
};

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function FitnessQuiz({ t, step, answers, onSelect, onNext, onBack, onFinish, completed, onClickSound, flowMode = false }) {
  const [direction, setDirection] = useState(1);

  const tap = (fn) => () => {
    onClickSound?.();
    fn();
  };

  const goNext = () => {
    setDirection(1);
    if (step < QUIZ_STEPS.length - 1) onNext();
    else onFinish({});
  };

  const goBack = () => {
    setDirection(-1);
    onBack();
  };

  if (completed && answers && !flowMode) {
    return (
      <section className="ft-panel glass ft-quiz-app ft-quiz-done" id="fitness-quiz">
        <motion.div
          className="ft-quiz-celebrate"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="ft-quiz-celebrate__icon">🎉</span>
          <h2 className="ft-panel__title">{t("quizReadyTitle")}</h2>
          <p className="ft-panel__desc">{t("quizReadySub")}</p>
          <div className="ft-chips ft-quiz-summary">
            {QUIZ_STEPS.map((s) => {
              const val = answers[s.key];
              if (!val) return null;
              const display = Array.isArray(val)
                ? val.map((v) => {
                    const opt = s.options.find((o) => o.v === v);
                    return opt ? t(opt.l) : v;
                  }).join(", ")
                : t(s.options.find((o) => o.v === val)?.l || val);
              return (
                <span key={s.key} className="ft-chip is-active">
                  {STEP_ICONS[s.key]} {display}
                </span>
              );
            })}
          </div>
          <button type="button" className="ft-btn ft-btn--soft" onClick={tap(() => onFinish({ restart: true }))}>
            {t("editQuiz")}
          </button>
        </motion.div>
      </section>
    );
  }

  const current = QUIZ_STEPS[step];
  const selected = answers?.[current.key];
  const canNext = current.multi
    ? Array.isArray(selected) && selected.length > 0
    : Boolean(selected);
  const progressPct = ((step + 1) / QUIZ_STEPS.length) * 100;

  const toggleMulti = (v) => {
    const cur = Array.isArray(selected) ? selected : [];
    if (v === "none") {
      onSelect(current.key, ["none"]);
      return;
    }
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur.filter((x) => x !== "none"), v];
    onSelect(current.key, next.length ? next : ["none"]);
  };

  return (
    <section className={`ft-panel glass ft-quiz-app ft-quiz-flow ${flowMode ? "ft-quiz-flow--page" : ""}`} id={flowMode ? undefined : "fitness-quiz"}>
      <div className="ft-quiz-flow__progress">
        <div className="ft-quiz-flow__bar" style={{ width: `${progressPct}%` }} />
        <span className="ft-quiz-flow__step">
          {step + 1} / {QUIZ_STEPS.length}
        </span>
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          className="ft-quiz-flow__body"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ft-quiz-flow__icon" aria-hidden="true">
            {STEP_ICONS[current.key] || "📝"}
          </span>
          <h2 className="ft-quiz-flow__question">{t(current.qKey)}</h2>

          <div className="ft-quiz-flow__opts">
            {current.options.map((opt) => {
              const isOn = current.multi
                ? Array.isArray(selected) && selected.includes(opt.v)
                : selected === opt.v;
              const emoji = OPTION_EMOJIS[opt.v] || "✓";
              return (
                <motion.button
                  key={opt.v}
                  type="button"
                  className={`ft-quiz-flow__opt ${isOn ? "is-selected" : ""}`}
                  onClick={tap(() =>
                    current.multi ? toggleMulti(opt.v) : onSelect(current.key, opt.v)
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="ft-quiz-flow__opt-emoji">{emoji}</span>
                  <span className="ft-quiz-flow__opt-label">{t(opt.l)}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="ft-quiz-nav">
        {step > 0 && (
          <button type="button" className="ft-btn ft-btn--soft" onClick={tap(goBack)}>
            {t("quizBack")}
          </button>
        )}
        <button
          type="button"
          className="ft-btn ft-btn--primary ft-btn--lg"
          disabled={!canNext}
          onClick={tap(goNext)}
        >
          {step < QUIZ_STEPS.length - 1 ? t("quizNext") : t("quizFinish")}
        </button>
      </div>
    </section>
  );
}
