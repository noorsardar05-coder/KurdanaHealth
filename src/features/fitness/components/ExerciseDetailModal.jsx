import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Play } from "lucide-react";
import {
  exDetail,
  exEquipment,
  exMuscles,
  exName,
  exSafety,
  parseSteps,
} from "../utils/exerciseHelpers.js";
import ExerciseMediaPreview from "./ExerciseMediaPreview.jsx";

const DIFF_KEYS = { beginner: "diffBeginner", intermediate: "diffInter", advanced: "diffAdv" };

export default function ExerciseDetailModal({
  exercise,
  lang,
  t,
  onClose,
  onStart,
  onMediaUnavailable,
}) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!exercise) return null;

  const steps = parseSteps(exercise, lang);
  const diffKey = DIFF_KEYS[exercise.difficulty] || "diffBeginner";
  const setup = lang === "ku" ? exercise.setupKu || exercise.setupEn : exercise.setupEn;
  const movement = lang === "ku" ? exercise.movementKu || exercise.movementEn : exercise.movementEn;
  const breathing = lang === "ku" ? exercise.breathingKu || exercise.breathingEn : exercise.breathingEn;
  const mistakes = lang === "ku" ? exercise.mistakesKu || exercise.mistakesEn : exercise.mistakesEn;

  return (
    <AnimatePresence>
      <motion.div
        className="el-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          className="el-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="el-modal-title"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button ref={closeRef} type="button" className="el-modal__close" onClick={onClose} aria-label={t("close")}>
            <X size={20} />
          </button>

          <ExerciseMediaPreview
            exercise={exercise}
            className="el-modal__media"
            onUnavailable={onMediaUnavailable}
          />

          <div className="el-modal__body">
            <h2 id="el-modal-title" className="el-modal__title">{exName(exercise, lang)}</h2>

            <div className="el-modal__tags">
              <span className={`el-card__diff el-card__diff--${exercise.difficulty}`}>{t(diffKey)}</span>
              <span className="el-modal__tag">{exMuscles(exercise, lang)}</span>
              <span className="el-modal__tag">{exDetail(exercise, lang)}</span>
              <span className="el-modal__tag">{exEquipment(exercise, lang)}</span>
            </div>

            <div className="el-modal__sections">
              {setup && (
                <section className="el-modal__section">
                  <h3>{t("guideSetup")}</h3>
                  <p>{setup}</p>
                </section>
              )}
              {movement && (
                <section className="el-modal__section">
                  <h3>{t("guideMovement")}</h3>
                  <p>{movement}</p>
                </section>
              )}
              {breathing && (
                <section className="el-modal__section">
                  <h3>{t("guideBreathing")}</h3>
                  <p>{breathing}</p>
                </section>
              )}
              {steps.length > 0 && (
                <section className="el-modal__section">
                  <h3>{t("steps")}</h3>
                  <ol className="el-modal__steps">
                    {steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </section>
              )}
              {mistakes && (
                <section className="el-modal__section">
                  <h3>{t("guideMistakes")}</h3>
                  <p>{mistakes}</p>
                </section>
              )}
              <section className="el-modal__section el-modal__section--safety">
                <h3>{t("guideSafety")}</h3>
                <p>{exSafety(exercise, lang)}</p>
              </section>
            </div>

            <button type="button" className="el-modal__start" onClick={() => onStart(exercise)}>
              <Play size={18} />
              {t("startExercise")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
