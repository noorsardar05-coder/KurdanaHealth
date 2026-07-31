import { motion } from "framer-motion";
import { BABY_WEEKS, BABY_MILESTONES } from "../data/content.js";

export default function Baby({ lang, tx, profile, state, onUpdateState, onCelebrate }) {
  const age = profile?.age || "0-2w";
  const week = BABY_WEEKS[age] || BABY_WEEKS["0-2w"];
  const milestones = state.milestones || {};

  const relevant = BABY_MILESTONES.filter((m) => m.from.includes(age));
  const L = (obj) => (lang === "ku" ? obj.ku : obj.en);

  function markMilestone(id) {
    if (milestones[id]) return;
    onUpdateState({
      milestones: { ...milestones, [id]: new Date().toISOString() },
    });
    onCelebrate(tx("celebrate"));
  }

  return (
    <motion.div
      className="ftm-page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="ftm-section">
        <h1 className="ftm-h1 ftm-display">{tx("babyTitle")}</h1>
        <p className="ftm-lead">{tx("babySub")}</p>
        <h2 className="ftm-h2 ftm-display">{L(week.title)}</h2>
      </section>

      <section className="ftm-section">
        <div className={`ftm-baby-model ftm-baby-model--${age}`}>
          <div className="ftm-baby-model__circle">
            <div className="ftm-baby-model__inner" />
          </div>
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("milestones")}</p>
        <div className="ftm-chip-row">
          {relevant.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`ftm-chip ${milestones[m.id] ? "is-selected" : ""}`}
              onClick={() => markMilestone(m.id)}
            >
              {milestones[m.id] ? "✓ " : ""}
              {L(m)}
            </button>
          ))}
        </div>
        <p className="ftm-text-muted ftm-mt">{tx("markDone")}</p>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("notice")}</p>
        <div className="ftm-chip-row">
          {week.notice.map((n, i) => (
            <span key={i} className="ftm-chip" style={{ cursor: "default" }}>
              {L(n)}
            </span>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("expected")}</p>
        <div className="ftm-chip-row">
          {week.expected.map((n, i) => (
            <span key={i} className="ftm-chip ftm-card--soft" style={{ cursor: "default" }}>
              {L(n)}
            </span>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
