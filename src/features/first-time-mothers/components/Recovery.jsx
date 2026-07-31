import { motion } from "framer-motion";
import {
  PAIN_LEVELS,
  MOODS,
  RECOVERY_WEEKS,
  RECOVERY_GOALS,
} from "../data/content.js";
import { dateKey } from "../utils/storage.js";

function ProgressRing({ done, total }) {
  const r = 24;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? done / total : 0;
  const offset = circ * (1 - pct);

  return (
    <div className="ftm-ring">
      <svg viewBox="0 0 56 56">
        <circle className="ftm-ring__bg" cx="28" cy="28" r={r} />
        <circle
          className="ftm-ring__fg"
          cx="28"
          cy="28"
          r={r}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="ftm-ring__label">
        {done}/{total}
      </span>
    </div>
  );
}

function estimateWeek(profile) {
  if (!profile?.completedAt) return 1;
  const days = Math.floor((Date.now() - new Date(profile.completedAt).getTime()) / 86400000);
  if (days < 7) return 1;
  if (days < 14) return 2;
  if (days < 21) return 3;
  if (days < 28) return 4;
  if (days < 42) return 6;
  return 8;
}

export default function Recovery({ lang, tx, profile, state, onUpdateState, onCelebrate }) {
  const today = dateKey();
  const currentWeek = estimateWeek(profile);

  const goalsToday = state.recoveryGoals?.[today] || [];
  const doneCount = goalsToday.length;
  const totalGoals = RECOVERY_GOALS.length;

  const pain = state.painDate === today ? state.pain : null;
  const recoveryMood = state.recoveryMood;

  function setPain(id) {
    onUpdateState({ pain: id, painDate: today });
  }

  function setRecoveryMood(id) {
    onUpdateState({ recoveryMood: id });
  }

  function toggleGoal(goalId) {
    const list = [...goalsToday];
    const idx = list.indexOf(goalId);
    if (idx >= 0) list.splice(idx, 1);
    else list.push(goalId);

    const next = { ...state.recoveryGoals, [today]: list };
    onUpdateState({ recoveryGoals: next });

    if (list.length === totalGoals && goalsToday.length < totalGoals) {
      onCelebrate(tx("celebrate"));
    }
  }

  function scarCareTap() {
    onCelebrate(lang === "ku" ? "ساتێکی نەرم بۆ چاودێری شوێنی برین" : "A gentle scar-care moment");
  }

  const L = (obj) => (lang === "ku" ? obj.ku : obj.en);

  return (
    <motion.div
      className="ftm-page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="ftm-section">
        <h1 className="ftm-h1 ftm-display">{tx("recoveryTitle")}</h1>
        <p className="ftm-lead">{tx("recoverySub")}</p>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("painCheck")}</p>
        <div className="ftm-pain-row">
          {PAIN_LEVELS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`ftm-pain-btn ${pain === p.id ? "is-selected" : ""}`}
              onClick={() => setPain(p.id)}
            >
              {lang === "ku" ? p.ku : p.en}
            </button>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("moodCheck")}</p>
        <div className="ftm-chip-row">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`ftm-chip ${recoveryMood === m.id ? "is-selected" : ""}`}
              onClick={() => setRecoveryMood(m.id)}
            >
              <span>{m.emoji}</span>
              <span>{lang === "ku" ? m.ku : m.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("timeline")}</p>
        <div className="ftm-timeline">
          {RECOVERY_WEEKS.map((w) => (
            <div
              key={w.w}
              className={`ftm-timeline__item ${w.w === currentWeek ? "is-current" : ""}`}
            >
              <span className="ftm-timeline__week">
                {tx("weekOf")} {w.w}
              </span>
              <p className="ftm-timeline__label">{L(w)}</p>
              <p className="ftm-timeline__tip">{L(w.tip)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <div className="ftm-row ftm-mb">
          <p className="ftm-label" style={{ margin: 0 }}>
            {tx("dailyGoals")}
          </p>
          <ProgressRing done={doneCount} total={totalGoals} />
        </div>
        <div className="ftm-goals">
          {RECOVERY_GOALS.map((g) => {
            const isDone = goalsToday.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                className={`ftm-goal ${isDone ? "is-done" : ""}`}
                onClick={() => toggleGoal(g.id)}
              >
                <span className="ftm-goal__check">{isDone ? "✓" : ""}</span>
                <span className="ftm-goal__text">{lang === "ku" ? g.ku : g.en}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("healing")}</p>
        <div className="ftm-healing">
          <div className="ftm-healing__orb" aria-hidden="true" />
        </div>
      </section>

      <section className="ftm-section">
        <div
          className="ftm-scar-care"
          role="button"
          tabIndex={0}
          onClick={scarCareTap}
          onKeyDown={(e) => e.key === "Enter" && scarCareTap()}
        >
          <p className="ftm-label" style={{ margin: "0 0 6px" }}>
            {tx("scarCare")}
          </p>
          <p className="ftm-text-muted" style={{ margin: 0 }}>
            {lang === "ku"
              ? "دەستت بە نەرمی لەسەر شوێنی برین بخە. سێ هەناسەی هێواش."
              : "Soft touch on your scar area. Three slow breaths."}
          </p>
        </div>
      </section>
    </motion.div>
  );
}
