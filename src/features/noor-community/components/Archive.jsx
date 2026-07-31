import { Clock } from "lucide-react";
import { t, L } from "../i18n/index.js";
import BodyArt from "./BodyArt.jsx";
import { previousDiseases } from "../utils/week.js";
import { getDiseaseProgress } from "../utils/storage.js";

export default function Archive({ lang, all, currentId, state, onOpen }) {
  const tx = (k, vars) => t(k, lang, vars);
  const list = previousDiseases(all, currentId);

  if (!list.length) {
    return <p className="noor-empty">{tx("emptyArchive")}</p>;
  }

  return (
    <div>
      <h1 className="noor-display" style={{ fontSize: "1.6rem", margin: "0 0 8px" }}>
        {tx("previousWeeks")}
      </h1>
      <p className="noor-body" style={{ marginBottom: 18 }}>
        {tx("heroSlogan")}
      </p>
      <div className="noor-archive-list">
        {list.map((d) => {
          const p = getDiseaseProgress(state, d.id);
          return (
            <button
              key={d.id}
              type="button"
              className="noor-card noor-card--tap noor-week-card"
              onClick={() => onOpen(d.id)}
            >
              <div className="noor-week-card__art">
                <BodyArt kind={d.heroIllustration} className="noor-body-svg" />
              </div>
              <div>
                <h3 className="noor-display" style={{ fontSize: "1.1rem" }}>
                  {L(d.title, lang)}
                </h3>
                <p>{L(d.shortTitle, lang)}</p>
                <div className="noor-meta">
                  <span className="noor-chip">
                    <Clock size={14} />
                    {tx("learningTime", { n: d.estimatedMinutes })}
                  </span>
                  {p.badge && <span className="noor-chip">{tx("badgeEarned")}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
