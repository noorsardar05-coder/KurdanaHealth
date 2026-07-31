import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import SoftArt from "./SoftArt.jsx";
import {
  MOODS,
  SLEEP_OPTS,
  moodReminder,
  ageLabel,
} from "../data/content.js";
import { dateKey } from "../utils/storage.js";

function greeting(tx) {
  const h = new Date().getHours();
  if (h < 12) return tx("greetMorning");
  if (h < 17) return tx("greetAfternoon");
  return tx("greetEvening");
}

function formatFeedTime(iso, lang) {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString(lang === "ku" ? "ku" : "en", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function sideLabel(side, tx) {
  const map = { L: tx("breastL"), R: tx("breastR"), Both: tx("both"), Bottle: tx("bottle"), Formula: tx("formula") };
  return map[side] || side;
}

export default function Home({ lang, tx, name, profile, state, onUpdateState, onNavigate }) {
  const today = dateKey();
  const age = profile?.age || "0-2w";
  const mood = state.moodDate === today ? state.mood : null;
  const sleep = state.sleepDate === today ? state.babySleep : null;

  const waterCount = state.waterDate === today ? state.water : 0;

  const lastFeed = [...(state.feeds || [])].sort((a, b) => new Date(b.at) - new Date(a.at))[0];

  function setMood(id) {
    onUpdateState({ mood: id, moodDate: today });
  }

  function setSleep(id) {
    onUpdateState({ babySleep: id, sleepDate: today });
  }

  function addWater() {
    const base = state.waterDate === today ? state.water : 0;
    onUpdateState({ water: base + 1, waterDate: today });
  }

  function resetWater() {
    onUpdateState({ water: 0, waterDate: today });
  }

  return (
    <motion.div
      className="ftm-page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="ftm-section ftm-section--hero">
        <SoftArt variant="orb" />
        <div className="ftm-content">
          <h1 className="ftm-h1 ftm-display">
            {greeting(tx)}
            {name ? `, ${name}` : ""}
          </h1>
          <p className="ftm-lead">{ageLabel(age, lang)}</p>
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("howAreYou")}</p>
        <div className="ftm-chip-row">
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`ftm-chip ${mood === m.id ? "is-selected" : ""}`}
              onClick={() => setMood(m.id)}
            >
              <span>{m.emoji}</span>
              <span>{lang === "ku" ? m.ku : m.en}</span>
            </button>
          ))}
        </div>
        {mood && (
          <p className="ftm-text-muted ftm-mt">{moodReminder(mood, lang)}</p>
        )}
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("howBabySleep")}</p>
        <div className="ftm-chip-row">
          {SLEEP_OPTS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`ftm-chip ${sleep === s.id ? "is-selected" : ""}`}
              onClick={() => setSleep(s.id)}
            >
              <span>{s.emoji}</span>
              <span>{lang === "ku" ? s.ku : s.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ftm-section">
        <div
          className="ftm-card ftm-card--tap"
          role="button"
          tabIndex={0}
          onClick={() => onNavigate("feeding")}
          onKeyDown={(e) => e.key === "Enter" && onNavigate("feeding")}
        >
          <div className="ftm-row">
            <div>
              <p className="ftm-label">{tx("lastFeeding")}</p>
              {lastFeed ? (
                <>
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {sideLabel(lastFeed.side, tx)} · {formatFeedTime(lastFeed.at, lang)}
                  </p>
                  {lastFeed.duration && (
                    <p className="ftm-text-muted">{Math.round(lastFeed.duration / 60)} min</p>
                  )}
                </>
              ) : (
                <p className="ftm-text-muted">{tx("noFeedYet")}</p>
              )}
            </div>
            <ChevronRight size={20} className="ftm-text-muted" />
          </div>
        </div>
      </section>

      <section className="ftm-section">
        <p className="ftm-label">{tx("drinkWater")}</p>
        <div className="ftm-card">
          <div className="ftm-water">
            <span className="ftm-water__count">{waterCount}</span>
            <div>
              <p className="ftm-text-muted" style={{ margin: "0 0 8px" }}>
                {tx("waterGoal")}
              </p>
              <div className="ftm-water__glasses">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`ftm-water__glass ${i < waterCount ? "is-filled" : ""}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="ftm-row ftm-mt">
            <button type="button" className="ftm-btn ftm-btn--accent" onClick={addWater}>
              +1
            </button>
            {waterCount > 0 && (
              <button type="button" className="ftm-btn ftm-btn--ghost" onClick={resetWater}>
                {tx("reset")}
              </button>
            )}
          </div>
        </div>
      </section>

      <p className="ftm-disclaimer">{tx("disclaimer")}</p>
    </motion.div>
  );
}
