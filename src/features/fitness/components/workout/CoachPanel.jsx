import { getExerciseGuide, getGuideLabels } from "../../utils/exerciseGuide.js";

const KEYS = ["setup", "movement", "breathing", "commonMistake", "safety", "easier", "harder"];

export default function CoachPanel({ exercise, lang, t, className }) {
  if (!exercise) return null;

  const guide = getExerciseGuide(exercise, lang);
  const labels = getGuideLabels(lang);

  return (
    <div className={`wp-coach ${className || ""}`}>
      <h3 className="wp-coach__heading">{t?.("coachGuideTitle") || "Coach guide"}</h3>
      <div className="wp-coach__list">
        {KEYS.map((key) => {
          const text = guide?.[key];
          if (!text) return null;
          return (
            <article key={key} className={`wp-coach__item wp-coach__item--${key}`}>
              <h4 className="wp-coach__label">{labels[key]}</h4>
              <p className="wp-coach__text">{text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
