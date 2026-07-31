import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { exDetail, exMuscles, exName } from "../utils/exerciseHelpers.js";
import ExerciseMediaPreview from "./ExerciseMediaPreview.jsx";

const DIFF_KEYS = { beginner: "diffBeginner", intermediate: "diffInter", advanced: "diffAdv" };

export default function PlanExerciseCard({ exercise, lang, t, onStart, onDetail, index }) {
  const diffKey = DIFF_KEYS[exercise.difficulty] || "diffBeginner";

  return (
    <motion.article
      className="ft-plan-card glass"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.05, duration: 0.35 }}
    >
      <button
        type="button"
        className="ft-plan-card__media-btn"
        onClick={() => onDetail?.(exercise)}
        aria-label={exName(exercise, lang)}
      >
        <ExerciseMediaPreview exercise={exercise} className="ft-plan-card__media" />
        <span className="ft-plan-card__index">{index + 1}</span>
      </button>

      <div className="ft-plan-card__body">
        <h4 className="ft-plan-card__name">{exName(exercise, lang)}</h4>

        <div className="ft-plan-card__tags">
          <span className="ft-plan-card__tag">{exDetail(exercise, lang)}</span>
          <span className={`ft-plan-card__diff ft-plan-card__diff--${exercise.difficulty}`}>
            {t(diffKey)}
          </span>
        </div>

        <p className="ft-plan-card__muscles">{exMuscles(exercise, lang)}</p>

        <div className="ft-plan-card__actions">
          <button type="button" className="ft-btn ft-btn--soft ft-btn--sm" onClick={() => onDetail?.(exercise)}>
            <Info size={14} />
            {t("viewDetails")}
          </button>
          <button type="button" className="ft-btn ft-btn--primary ft-btn--sm" onClick={() => onStart?.(exercise)}>
            <Play size={14} />
            {t("startExercise")}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
