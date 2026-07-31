import { ACHIEVEMENTS } from "../utils/storage.js";
import { s } from "../data/ui.js";

export default function AchievementsPanel({ lang, state }) {
  const earned = new Set(state.achievements || []);
  return (
    <div className="bw-achievements">
      <h2 className="bw-section-title">{s(lang, "allBadges")}</h2>
      {earned.size === 0 && <p className="bw-muted">{s(lang, "emptyBadges")}</p>}
      <div className="bw-badge-grid">
        {ACHIEVEMENTS.map((a) => {
          const on = earned.has(a.id);
          return (
            <div key={a.id} className={`bw-badge-card ${on ? "is-on" : "is-off"}`}>
              <span>{a.icon}</span>
              <strong>{a.title[lang]}</strong>
              {!on && <em>{s(lang, "lockedTip")}</em>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
