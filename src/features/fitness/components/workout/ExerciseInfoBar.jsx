import { exName, exMuscles, exEquipment, exDetail, caloriesForExercise } from "../../utils/exerciseHelpers.js";

function diffLabel(ex, lang, t) {
  const d = ex.difficulty;
  if (d === "beginner") return t("diffBeginner");
  if (d === "intermediate") return t("diffInter");
  if (d === "advanced") return t("diffAdv");
  return d || "—";
}

export default function ExerciseInfoBar({ exercise, lang, t }) {
  if (!exercise) return null;

  const isTimed = Boolean(exercise.durationSec);
  const metric = exDetail(exercise, lang);
  const cal = caloriesForExercise(exercise);

  return (
    <div className="wp-info">
      <h2 className="wp-info__name">{exName(exercise, lang)}</h2>
      <div className="wp-info__grid">
        <div className="wp-info__cell">
          <span className="wp-info__label">{t("infoMuscles")}</span>
          <span className="wp-info__value">{exMuscles(exercise, lang)}</span>
        </div>
        <div className="wp-info__cell">
          <span className="wp-info__label">{t("difficulty")}</span>
          <span className="wp-info__value">{diffLabel(exercise, lang, t)}</span>
        </div>
        <div className="wp-info__cell">
          <span className="wp-info__label">{isTimed ? t("exerciseTimer") : t("infoReps")}</span>
          <span className="wp-info__value">{metric}</span>
        </div>
        <div className="wp-info__cell">
          <span className="wp-info__label">{t("statCalories")}</span>
          <span className="wp-info__value">~{cal}</span>
        </div>
        <div className="wp-info__cell wp-info__cell--wide">
          <span className="wp-info__label">{t("equipLabel")}</span>
          <span className="wp-info__value">{exEquipment(exercise, lang)}</span>
        </div>
      </div>
    </div>
  );
}
