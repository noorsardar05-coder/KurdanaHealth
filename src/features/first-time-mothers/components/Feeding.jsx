import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FEED_FAQS, feedPatternHint } from "../data/content.js";

const SIDES = [
  { id: "L", labelKey: "breastL" },
  { id: "R", labelKey: "breastR" },
  { id: "Both", labelKey: "both" },
  { id: "Bottle", labelKey: "bottle" },
  { id: "Formula", labelKey: "formula" },
];

function formatTime(iso, lang) {
  return new Date(iso).toLocaleTimeString(lang === "ku" ? "ku" : "en", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function todayFeeds(feeds) {
  const todayStr = new Date().toDateString();
  return (feeds || []).filter((f) => new Date(f.at).toDateString() === todayStr);
}

export default function Feeding({ lang, tx, state, onUpdateState }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const timer = state.feedTimer;
  const active = timer?.startedAt && !timer?.paused;

  useEffect(() => {
    if (!active) return;
    const tick = () => setElapsed(Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active, timer?.startedAt]);

  const feedsToday = useMemo(() => todayFeeds(state.feeds), [state.feeds]);
  const hint = feedPatternHint(state.feeds || [], lang);

  function logFeed(side) {
    const entry = { side, at: new Date().toISOString(), duration: null };
    onUpdateState({ feeds: [...(state.feeds || []), entry] });
  }

  function startTimer(side) {
    onUpdateState({
      feedTimer: { side, startedAt: new Date().toISOString() },
    });
    setElapsed(0);
  }

  function stopTimer() {
    if (!timer?.startedAt) return;
    const duration = Math.floor((Date.now() - new Date(timer.startedAt).getTime()) / 1000);
    const entry = {
      side: timer.side,
      at: new Date().toISOString(),
      duration,
    };
    onUpdateState({
      feeds: [...(state.feeds || []), entry],
      feedTimer: null,
    });
    setElapsed(0);
  }

  function fmtTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
        <h1 className="ftm-h1 ftm-display">{tx("feedTitle")}</h1>
        <p className="ftm-lead">{tx("feedSub")}</p>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("logNow")}</p>
        <div className="ftm-feed-btns">
          {SIDES.map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              className={`ftm-feed-btn ${timer?.side === id ? "is-active" : ""}`}
              onClick={() => logFeed(id)}
            >
              <span>{tx(labelKey)}</span>
              <span className="ftm-text-small ftm-text-muted">{tx("tapToLog")}</span>
            </button>
          ))}
        </div>
        <div className="ftm-timer ftm-card ftm-mt">
          <p className="ftm-label">{tx("startTimer")}</p>
          <div className="ftm-chip-row ftm-mb">
            {SIDES.slice(0, 3).map(({ id, labelKey }) => (
              <button
                key={id}
                type="button"
                className={`ftm-chip ${timer?.side === id ? "is-selected" : ""}`}
                onClick={() => startTimer(id)}
              >
                {tx(labelKey)}
              </button>
            ))}
          </div>
          {timer && (
            <>
              <p className="ftm-timer__display">{fmtTimer(elapsed)}</p>
              <button type="button" className="ftm-btn ftm-btn--primary" onClick={stopTimer}>
                {tx("stopTimer")}
              </button>
            </>
          )}
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("patternHint")}</p>
        <div className="ftm-card ftm-card--soft">
          <p style={{ margin: 0 }}>{hint}</p>
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("todayFeeds")}</p>
        {feedsToday.length === 0 ? (
          <p className="ftm-text-muted">{tx("noFeedYet")}</p>
        ) : (
          <div className="ftm-feed-list">
            {[...feedsToday].reverse().map((f, i) => (
              <div key={i} className="ftm-feed-item">
                <span>
                  {SIDES.find((s) => s.id === f.side)?.labelKey
                    ? tx(SIDES.find((s) => s.id === f.side).labelKey)
                    : f.side}
                </span>
                <span className="ftm-text-muted">
                  {formatTime(f.at, lang)}
                  {f.duration ? ` · ${Math.round(f.duration / 60)}m` : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("quickQ")}</p>
        <div className="ftm-faq">
          {FEED_FAQS.map((faq) => (
            <div key={faq.id} className="ftm-faq__item">
              <button
                type="button"
                className="ftm-faq__q"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              >
                {L(faq.q)}
                {openFaq === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openFaq === faq.id && <div className="ftm-faq__a">{L(faq.a)}</div>}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
