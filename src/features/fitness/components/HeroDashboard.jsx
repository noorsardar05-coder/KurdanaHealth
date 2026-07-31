import { motion } from "framer-motion";
import { Play, Clock, Flame, Zap, ChevronRight } from "lucide-react";
import CircularProgress from "./CircularProgress.jsx";

function diffLabel(plan, t) {
  if (!plan?.difficulty) return t("diffBeginner");
  const map = { advanced: "diffAdv", intermediate: "diffInter", beginner: "diffBeginner" };
  return t(map[plan.difficulty] || "diffBeginner");
}

const DAY_LABELS = { en: ["M", "T", "W", "T", "F", "S", "S"], ku: ["ی", "د", "س", "چ", "پ", "ه", "ش"] };

function getGreeting(t, userName) {
  const firstName = userName?.trim().split(/\s+/)[0];
  if (!firstName) return t("welcomeBack");

  const hour = new Date().getHours();
  let periodKey = "greetAfternoon";
  if (hour < 12) periodKey = "greetMorning";
  else if (hour >= 17) periodKey = "greetEvening";

  return `${t(periodKey)}, ${firstName}.`;
}

export default function HeroDashboard({
  t,
  lang,
  progress,
  plan,
  logs,
  userName,
  onStart,
  onRetake,
}) {
  const hasPlan = Boolean(plan?.list?.length);
  const greeting = getGreeting(t, userName);
  const weekTotal = progress.weeklyMinutes.reduce((a, b) => a + b, 0);
  const weekGoal = 150;
  const dayLabels = DAY_LABELS[lang] || DAY_LABELS.en;
  const maxWeek = Math.max(...progress.weeklyMinutes, 1);

  return (
    <section className="ft-dash" id="fitness-hero">
      <h1 className="ft-dash-greeting">{greeting}</h1>

      <motion.div
        className="ft-hero-workout glass"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="ft-hero-workout__content">
          <p className="ft-hero-workout__eyebrow">{t("todayWorkout")}</p>
          <h2 className="ft-hero-workout__title">
            {hasPlan ? t("planTitle") : t("heroNoPlan")}
          </h2>

          {hasPlan ? (
            <>
              <div className="ft-hero-workout__meta">
                <span className="ft-hero-meta">
                  <Clock size={16} />
                  {plan.totalDuration} {t("minUnit")}
                </span>
                <span className="ft-hero-meta">
                  <Zap size={16} />
                  {diffLabel(plan, t)}
                </span>
                <span className="ft-hero-meta">
                  <Flame size={16} />
                  ~{plan.caloriesEstimate} {t("caloriesShort")}
                </span>
              </div>
              <p className="ft-hero-workout__sub">
                {plan.exerciseCount} {t("exerciseCount")} · {t("planDesc")}
              </p>
            </>
          ) : (
            <p className="ft-hero-workout__sub">{t("retakeQuizDesc")}</p>
          )}

          <motion.button
            type="button"
            className="ft-btn ft-btn--hero"
            onClick={hasPlan ? onStart : onRetake}
            disabled={!hasPlan && !onRetake}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play size={20} fill="currentColor" />
            {hasPlan ? t("startWorkout") : t("retakeQuiz")}
          </motion.button>
        </div>

        {hasPlan && (
          <div className="ft-hero-workout__visual" aria-hidden="true">
            <div className="ft-hero-ring-wrap">
              <CircularProgress
                value={plan.exerciseCount}
                max={Math.max(plan.exerciseCount, 8)}
                size={120}
                stroke={6}
                label={plan.exerciseCount}
                sublabel={t("exercises")}
              />
            </div>
          </div>
        )}
      </motion.div>

      <div className="ft-dash-secondary">
        <motion.div
          className="ft-dash-card glass"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="ft-dash-card__head">
            <h3 className="ft-section-label">{t("weeklyLabel")}</h3>
            <CircularProgress
              value={weekTotal}
              max={weekGoal}
              size={52}
              stroke={4}
              label={`${weekTotal}`}
              sublabel={t("minUnit")}
            />
          </div>
          <div className="ft-weekly-bars ft-weekly-bars--compact">
            {progress.weeklyMinutes.map((min, i) => (
              <div key={i} className="ft-weekly-col">
                <motion.div
                  className="ft-weekly-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(6, (min / maxWeek) * 100)}%` }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                  title={`${min} min`}
                />
                <span>{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="ft-dash-card glass ft-dash-card--streak"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="ft-dash-streak__icon" aria-hidden="true">🔥</span>
          <div className="ft-dash-streak__info">
            <span className="ft-dash-streak__val">{progress.streak}</span>
            <span className="ft-dash-streak__label">{t("statStreak")}</span>
          </div>
          <p className="ft-dash-streak__hint">
            {progress.streak >= 7 ? t("streakAmazing") : t("streakKeepGoing")}
          </p>
        </motion.div>

        <motion.div
          className="ft-dash-card glass"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="ft-section-label">{t("yourStats")}</h3>
          <div className="ft-mini-stats">
            <div className="ft-mini-stat">
              <span className="ft-mini-stat__val">{progress.workoutsCompleted}</span>
              <span className="ft-mini-stat__label">{t("statWorkouts")}</span>
            </div>
            <div className="ft-mini-stat">
              <span className="ft-mini-stat__val">{progress.totalMinutes}</span>
              <span className="ft-mini-stat__label">{t("statMinutes")}</span>
            </div>
            <div className="ft-mini-stat">
              <span className="ft-mini-stat__val">{progress.points}</span>
              <span className="ft-mini-stat__label">{t("statPoints")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {logs.length > 0 && (
        <motion.div
          className="ft-recent-preview glass"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="ft-recent-preview__head">
            <h3 className="ft-section-label">{t("historyTitle")}</h3>
            <button
              type="button"
              className="ft-btn ft-btn--link ft-btn--sm"
              onClick={() => document.getElementById("fitness-progress")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("viewAll")}
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="ft-recent-preview__list">
            {logs.slice(0, 2).map((log, i) => (
              <div key={i} className="ft-recent-item">
                <span className="ft-recent-item__date">{log.date}</span>
                <span className="ft-recent-item__meta">
                  {log.minutes} {t("minUnit")} · {log.exercises} {t("exercises")}
                </span>
                <span className="ft-recent-item__status">✓</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
