import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ, AGE_FROM_STAGE } from "../data/content.js";
import { t } from "../i18n/strings.js";
import SoftArt from "./SoftArt.jsx";

export default function Quiz({ lang, setLang, onComplete }) {
  const tx = (k) => t(k, lang);
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  const totalSteps = QUIZ.length + 1;
  const progress = step < 0 ? 0 : ((step + 1) / totalSteps) * 100;

  function pickOption(qId, optId) {
    const next = { ...answers, [qId]: optId };
    setAnswers(next);
    if (step < QUIZ.length - 1) {
      setStep(step + 1);
    } else {
      setStep(QUIZ.length);
    }
  }

  function finish(skipName = false) {
    const stage = answers.stage || "0-2w";
    onComplete({
      ...(skipName || !name.trim() ? {} : { name: name.trim() }),
      stage,
      age: AGE_FROM_STAGE[stage] || stage,
      birth: answers.birth,
      feeding: answers.feeding,
      support: answers.support,
      worry: answers.worry,
      completedAt: new Date().toISOString(),
    });
  }

  const question = step >= 0 && step < QUIZ.length ? QUIZ[step] : null;
  const qText = question ? (lang === "ku" ? question.ku : question.en) : "";

  return (
    <div className={`ftm ftm-quiz ${lang === "ku" ? "is-ku" : ""}`}>
      <SoftArt variant="orb" />
      <div className="ftm-content">
        {typeof setLang === "function" && (
          <div className="ftm-lang-toggle" style={{ marginBottom: 20, alignSelf: "flex-end" }}>
            <button type="button" className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <button type="button" className={lang === "ku" ? "is-active" : ""} onClick={() => setLang("ku")}>
              کوردی
            </button>
          </div>
        )}
        <div className="ftm-quiz__progress">
          <div className="ftm-quiz__progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence mode="wait">
          {step < 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h1 className="ftm-h1 ftm-display">{tx("quizTitle")}</h1>
              <p className="ftm-lead">{tx("quizSub")}</p>
              <button type="button" className="ftm-btn ftm-btn--primary ftm-btn--wide" onClick={() => setStep(0)}>
                {tx("quizStart")}
              </button>
            </motion.div>
          )}

          {question && (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="ftm-label">
                {step + 1} / {QUIZ.length}
              </p>
              <h2 className="ftm-h2 ftm-display">{qText}</h2>
              <div className="ftm-quiz__options">
                {question.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="ftm-quiz__option"
                    onClick={() => pickOption(question.id, opt.id)}
                  >
                    {lang === "ku" ? opt.ku : opt.en}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === QUIZ.length && (
            <motion.div
              key="name"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="ftm-h2 ftm-display">
                {lang === "ku" ? "ناوت چییە؟ (ئارەزوومەندانە)" : "What should we call you? (optional)"}
              </h2>
              <input
                type="text"
                className="ftm-quiz__name-input"
                placeholder={lang === "ku" ? "ناوت یان بەتاڵی بهێڵەوە" : "Your name, or leave blank"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="ftm-stack">
                <button type="button" className="ftm-btn ftm-btn--primary ftm-btn--wide" onClick={() => finish(false)}>
                  {tx("quizDone")}
                </button>
                <button type="button" className="ftm-btn ftm-btn--ghost ftm-btn--wide" onClick={() => finish(true)}>
                  {tx("skip")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
