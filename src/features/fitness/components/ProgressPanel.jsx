import { motion } from "framer-motion";
import { BADGE_DEFS, getBadgeProgress } from "../data/badges.js";
import CircularProgress from "./CircularProgress.jsx";

const DAY_LABELS = { en: ["M", "T", "W", "T", "F", "S", "S"], ku: ["ی", "د", "س", "چ", "پ", "ه", "ش"] };

function formatDate(dateStr, lang) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === "ku" ? "ar-IQ" : "en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function ProgressPanel({
  t,
  lang,
  progress,
  logs,
  onMovedYes,
  onMovedNo,
  movedMsg,
  onReminder,
  onCancelReminder,
  reminderLabel,
}) {
  const maxWeek = Math.max(...progress.weeklyMinutes, 1);
  const earned = new Set(progress.badges || []);
  const weekTotal = progress.weeklyMinutes.reduce((a, b) => a + b, 0);
  const dayLabels = DAY_LABELS[lang] || DAY_LABELS.en;
  const completionPct = progress.workoutsCompleted > 0
    ? Math.min(100, Math.round((progress.workoutsCompleted / 10) * 100))
    : 0;

  return (
    <section className="ft-panel glass ft-progress-panel" id="fitness-progress">
      <h2 className="ft-panel__title">{t("progressTitle")}</h2>

      {/* Stats overview */}
      <div className="ft-progress-stats">
        <div className="ft-progress-stat glass">
          <CircularProgress
            value={weekTotal}
            max={150}
            size={80}
            stroke={5}
            label={`${weekTotal}`}
            sublabel={t("minUnit")}
          />
          <span className="ft-progress-stat__label">{t("weeklyLabel")}</span>
        </div>
        <div className="ft-progress-stat glass">
          <CircularProgress
            value={progress.streak}
            max={7}
            size={80}
            stroke={5}
            label={`${progress.streak}`}
            sublabel={t("daysUnit")}
            color="var(--ft-coral)"
          />
          <span className="ft-progress-stat__label">{t("statStreak")}</span>
        </div>
        <div className="ft-progress-stat glass">
          <CircularProgress
            value={completionPct}
            max={100}
            size={80}
            stroke={5}
            label={`${completionPct}%`}
            sublabel={t("completeLabel")}
          />
          <span className="ft-progress-stat__label">{t("completionRate")}</span>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="ft-weekly ft-weekly--full">
        <p className="ft-section-label">{t("activityChart")}</p>
        <div className="ft-weekly-bars">
          {progress.weeklyMinutes.map((min, i) => (
            <div key={i} className="ft-weekly-col">
              <motion.div
                className="ft-weekly-bar"
                initial={{ height: 0 }}
                whileInView={{ height: `${Math.max(8, (min / maxWeek) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                title={`${min} min`}
              />
              <span>{dayLabels[i]}</span>
              {min > 0 && <span className="ft-weekly-min">{min}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="ft-badges">
        <h3 className="ft-section-label">{t("badgesTitle")}</h3>
        <div className="ft-badge-grid">
          {BADGE_DEFS.map((b) => {
            const isEarned = earned.has(b.id);
            const { current, target, pct } = getBadgeProgress(b.id, progress);
            return (
              <motion.div
                key={b.id}
                className={`ft-badge ${isEarned ? "is-earned" : ""}`}
                whileHover={{ y: -2 }}
              >
                <span className="ft-badge__icon">{b.icon}</span>
                <span className="ft-badge__label">{t(b.key)}</span>
                {!isEarned && target > 0 && (
                  <div className="ft-badge__progress">
                    <div className="ft-badge__progress-bar" style={{ width: `${pct}%` }} />
                    <span className="ft-badge__progress-text">{current}/{target}</span>
                  </div>
                )}
                {isEarned && <span className="ft-badge__earned">✓</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Check-in & reminders */}
      <div className="ft-two-col">
        <div className="ft-subcard glass">
          <h3 className="ft-section-label">{t("movedToday")}</h3>
          <div className="ft-btn-row">
            <button type="button" className="ft-btn ft-btn--primary" onClick={onMovedYes}>{t("yes")}</button>
            <button type="button" className="ft-btn ft-btn--soft" onClick={onMovedNo}>{t("notYet")}</button>
          </div>
          {movedMsg && <p className="ft-hint">{movedMsg}</p>}
        </div>

        <div className="ft-subcard glass">
          <h3 className="ft-section-label">{t("reminders")}</h3>
          <div className="ft-btn-row">
            <button type="button" className="ft-btn ft-btn--soft" onClick={() => onReminder(600, t("rem10"))}>{t("rem10")}</button>
            <button type="button" className="ft-btn ft-btn--soft" onClick={() => onReminder(1800, t("rem30"))}>{t("rem30")}</button>
            <button type="button" className="ft-btn ft-btn--soft" onClick={() => onReminder(3600, t("rem1h"))}>{t("rem1h")}</button>
            <button type="button" className="ft-btn ft-btn--soft" onClick={() => onReminder("tomorrow", t("remTomorrow"))}>{t("remTomorrow")}</button>
          </div>
          {reminderLabel && (
            <p className="ft-hint">
              {reminderLabel}{" "}
              <button type="button" className="ft-btn ft-btn--link" onClick={onCancelReminder}>
                {t("reminderCancel")}
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="ft-history">
        <h3 className="ft-section-label">{t("historyTitle")}</h3>
        {logs.length === 0 ? (
          <p className="ft-muted">{t("noHistory")}</p>
        ) : (
          <div className="ft-timeline">
            {logs.slice(0, 8).map((log, i) => (
              <motion.div
                key={i}
                className="ft-timeline-card glass"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="ft-timeline-card__icon" aria-hidden="true">🏋️</div>
                <div className="ft-timeline-card__body">
                  <span className="ft-timeline-card__title">{t("guidedWorkout")}</span>
                  <span className="ft-timeline-card__meta">
                    {log.minutes} {t("minUnit")} · {log.exercises} {t("exercises")}
                  </span>
                </div>
                <div className="ft-timeline-card__right">
                  <span className="ft-timeline-card__date">{formatDate(log.date, lang)}</span>
                  <span className="ft-timeline-card__status">{t("statusComplete")}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
