import { useEffect, useState } from "react";
import { Clock, Award, Timer, Sparkles } from "lucide-react";
import { t, L } from "../i18n/index.js";
import BodyArt from "./BodyArt.jsx";
import {
  formatCountdown,
  msUntilNextWeek,
  previousDiseases,
} from "../utils/week.js";
import { getDiseaseProgress } from "../utils/storage.js";

export default function Home({ lang, current, all, state, onStart, onArchive, onOpenDisease }) {
  const tx = (k, vars) => t(k, lang, vars);
  const [countdown, setCountdown] = useState(() => formatCountdown(msUntilNextWeek(), (k) => tx(k)));

  useEffect(() => {
    const tick = () => setCountdown(formatCountdown(msUntilNextWeek(), (k) => t(k, lang)));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [lang]);

  if (!current) {
    return <p className="noor-empty">{tx("errorLoad")}</p>;
  }

  const progress = getDiseaseProgress(state, current.id);
  const sectionsApprox = 11;
  const pct = progress.completed
    ? 100
    : Math.min(95, Math.round(((progress.sectionIndex + 1) / sectionsApprox) * 100));
  const prev = previousDiseases(all, current.id).slice(0, 3);

  return (
    <div>
      <section className="noor-hero">
        <div className="noor-hero__art" aria-hidden="true">
          <BodyArt kind={current.heroIllustration} />
        </div>
        <p className="noor-hero__eyebrow">{tx("brand")}</p>
        <h1 className="noor-display">{tx("heroTitle")}</h1>
        <p className="noor-hero__sub">{tx("heroSub")}</p>
        <p className="noor-hero__slogan">{tx("heroSlogan")}</p>
        <div className="noor-cta-row">
          <button type="button" className="noor-btn noor-btn--primary" onClick={onStart}>
            {tx("startWeek")}
          </button>
          <button type="button" className="noor-btn noor-btn--secondary" onClick={onArchive}>
            {tx("explorePrevious")}
          </button>
        </div>
      </section>

      <section className="noor-section">
        <p className="noor-label">{tx("thisWeek")}</p>
        <button type="button" className="noor-card noor-card--tap noor-week-card" onClick={onStart}>
          <div className="noor-week-card__art">
            <BodyArt kind={current.heroIllustration} className="noor-body-svg" />
          </div>
          <div>
            <h3 className="noor-display">{L(current.title, lang)}</h3>
            <p>{L(current.shortTitle, lang)}</p>
            <div className="noor-meta">
              <span className="noor-chip">
                <Clock size={14} />
                {tx("learningTime", { n: current.estimatedMinutes })}
              </span>
              <span className="noor-chip">
                <Sparkles size={14} />
                {tx(`bodySystems.${current.bodySystem}`)}
              </span>
            </div>
          </div>
        </button>
      </section>

      <section className="noor-section">
        <div className="noor-stats">
          <div className="noor-stat">
            <p className="noor-stat__k">{tx("progress")}</p>
            <p className="noor-stat__v">{pct}%</p>
            <div className="noor-progress" aria-hidden="true">
              <div className="noor-progress__bar" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="noor-stat">
            <p className="noor-stat__k">{tx("weeklyQuiz")}</p>
            <p className="noor-stat__v">
              {progress.quizScore != null
                ? tx("quizScore", { n: progress.quizScore, t: progress.quizTotal })
                : tx("badgeLocked")}
            </p>
          </div>
          <div className="noor-stat">
            <p className="noor-stat__k">{tx("badgeReward")}</p>
            <p className="noor-stat__v">
              {progress.badge ? (
                <>
                  <Award size={14} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                  {L(current.badge, lang) || current.badge?.en}
                </>
              ) : (
                tx("badgeLocked")
              )}
            </p>
          </div>
          <div className="noor-stat">
            <p className="noor-stat__k">{tx("nextTopicIn")}</p>
            <p className="noor-stat__v">
              <Timer size={14} style={{ display: "inline", verticalAlign: "middle" }} /> {countdown}
            </p>
          </div>
        </div>
      </section>

      <section className="noor-section">
        <p className="noor-label">{tx("previousWeeks")}</p>
        {prev.length === 0 ? (
          <p className="noor-empty">{tx("emptyArchive")}</p>
        ) : (
          <div className="noor-archive-list">
            {prev.map((d) => (
              <button
                key={d.id}
                type="button"
                className="noor-card noor-card--tap noor-week-card"
                onClick={() => onOpenDisease(d.id)}
              >
                <div className="noor-week-card__art">
                  <BodyArt kind={d.heroIllustration} className="noor-body-svg" />
                </div>
                <div>
                  <h3 className="noor-display" style={{ fontSize: "1.05rem" }}>
                    {L(d.title, lang)}
                  </h3>
                  <p>{L(d.shortTitle, lang)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <p className="noor-safety">{tx("safetyBanner")}</p>
    </div>
  );
}
