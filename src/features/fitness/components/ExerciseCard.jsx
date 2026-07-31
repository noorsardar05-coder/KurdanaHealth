import { memo } from "react";
import { motion } from "framer-motion";
import { Bookmark, Dumbbell, Info, Play } from "lucide-react";
import { exDetail, exMuscles, exName } from "../utils/exerciseHelpers.js";
import ExerciseMediaPreview from "./ExerciseMediaPreview.jsx";

const DIFF_KEYS = { beginner: "diffBeginner", intermediate: "diffInter", advanced: "diffAdv" };

function hasEquipment(ex) {
  const eq = (ex.equipmentEn || "").toLowerCase();
  return eq && eq !== "none" && eq !== "هیچ";
}

function ExerciseCard({
  exercise,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  onStart,
  onDetail,
  onMediaUnavailable,
}) {
  const diffKey = DIFF_KEYS[exercise.difficulty] || "diffBeginner";

  return (
    <motion.article
      className="el-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" className="el-card__media-btn" onClick={() => onDetail(exercise)} aria-label={exName(exercise, lang)}>
        <ExerciseMediaPreview
          exercise={exercise}
          className="el-card__media"
          onUnavailable={onMediaUnavailable}
        />
      </button>

      <div className="el-card__body">
        <div className="el-card__top">
          <h3 className="el-card__name">{exName(exercise, lang)}</h3>
          <div className="el-card__icons">
            {hasEquipment(exercise) && (
              <span className="el-card__equip" title={exercise.equipmentEn} aria-label={exercise.equipmentEn}>
                <Dumbbell size={14} />
              </span>
            )}
            <button
              type="button"
              className={`el-card__fav ${isFavorite ? "el-card__fav--on" : ""}`}
              onClick={() => onToggleFavorite(exercise.id)}
              aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")}
              aria-pressed={isFavorite}
            >
              <Bookmark size={14} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              className="el-card__info"
              onClick={() => onDetail(exercise)}
              aria-label={t("viewDetails")}
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        <div className="el-card__meta">
          <span className="el-card__muscle">{exMuscles(exercise, lang)}</span>
          <span className={`el-card__diff el-card__diff--${exercise.difficulty}`}>{t(diffKey)}</span>
        </div>

        <div className="el-card__meta el-card__meta--row2">
          <span className="el-card__duration">{exDetail(exercise, lang)}</span>
        </div>

        <button type="button" className="el-card__start" onClick={() => onStart(exercise)}>
          <Play size={16} />
          {t("startExercise")}
        </button>
      </div>
    </motion.article>
  );
}

export default memo(ExerciseCard);
