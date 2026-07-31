import { motion } from "framer-motion";

export default function WorkoutComplete({ t, totalElapsed, calories, pointsEarned, streak, onSave }) {
  return (
    <motion.div
      className="wp-complete"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="wp-complete__fx" aria-hidden="true">
        <div className="wp-complete__orb wp-complete__orb--1" />
        <div className="wp-complete__orb wp-complete__orb--2" />
        <div className="wp-complete__orb wp-complete__orb--3" />
      </div>

      <h2 className="wp-complete__title">{t("workoutComplete")}</h2>
      <p className="wp-complete__subtitle">{t("celebration")}</p>

      <div className="wp-complete__stats">
        <div className="wp-complete__stat">
          <span className="wp-complete__stat-val">{Math.max(1, Math.round(totalElapsed / 60))}</span>
          <span className="wp-complete__stat-lbl">{t("statMinutes")}</span>
        </div>
        <div className="wp-complete__stat">
          <span className="wp-complete__stat-val">{calories || 0}</span>
          <span className="wp-complete__stat-lbl">{t("statCalories")}</span>
        </div>
        <div className="wp-complete__stat">
          <span className="wp-complete__stat-val">+{pointsEarned}</span>
          <span className="wp-complete__stat-lbl">{t("statPoints")}</span>
        </div>
        <div className="wp-complete__stat">
          <span className="wp-complete__stat-val">{streak}</span>
          <span className="wp-complete__stat-lbl">{t("statStreak")}</span>
        </div>
      </div>

      <button type="button" className="wp-btn wp-btn--primary wp-btn--xl" onClick={onSave}>
        {t("saveCompletion")}
      </button>
    </motion.div>
  );
}
