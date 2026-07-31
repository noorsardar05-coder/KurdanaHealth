import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Bookmark, Sparkles, Stethoscope, Lightbulb, User, Play } from "lucide-react";
import { pickDiscover } from "../data/content.js";
import { loadSaved, saveSaved } from "../utils/storage.js";

const TYPE_META = {
  myth: { labelKey: "myth", icon: Sparkles },
  hack: { labelKey: "hack", icon: Lightbulb },
  doctor: { labelKey: "doctor30", icon: Stethoscope },
  story: { labelKey: "story", icon: User },
  video: { labelKey: "watch20", icon: Play },
};

export default function Discover({ lang, tx, profile, state }) {
  const age = profile?.age || "0-2w";
  const mood = state.mood;

  const cards = useMemo(() => pickDiscover(age, mood), [age, mood]);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(() => loadSaved());

  const card = cards[index % cards.length];
  const content = lang === "ku" ? card.ku : card.en;
  const meta = TYPE_META[card.type] || TYPE_META.hack;
  const Icon = meta.icon;
  const isSaved = saved.includes(card.id);

  function toggleSave() {
    const next = isSaved ? saved.filter((id) => id !== card.id) : [...saved, card.id];
    setSaved(next);
    saveSaved(next);
  }

  function prev() {
    setIndex((i) => (i - 1 + cards.length) % cards.length);
  }

  function next() {
    setIndex((i) => (i + 1) % cards.length);
  }

  return (
    <motion.div
      className="ftm-page-enter"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="ftm-section">
        <h1 className="ftm-h1 ftm-display">{tx("discoverTitle")}</h1>
        <p className="ftm-lead">{tx("discoverSub")}</p>
      </section>

      <section className="ftm-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={card.id}
            className="ftm-discover-card"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <span className="ftm-discover-card__type">
              <Icon size={14} />
              {tx(meta.labelKey)}
            </span>
            <h2 className="ftm-discover-card__title">{content.title}</h2>

            {card.type === "myth" ? (
              <div className="ftm-myth-fact">
                <div className="ftm-myth-fact__row ftm-myth-fact__row--myth">
                  <strong>{tx("myth")}:</strong> {content.myth}
                </div>
                <div className="ftm-myth-fact__row ftm-myth-fact__row--fact">
                  <strong>{tx("fact")}:</strong> {content.fact}
                </div>
              </div>
            ) : (
              <p className="ftm-discover-card__body">{content.body}</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="ftm-discover-nav">
          <button type="button" className="ftm-btn ftm-btn--ghost" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <span className="ftm-text-muted">
            {index + 1} / {cards.length}
          </span>
          <button type="button" className="ftm-btn ftm-btn--ghost" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            className={`ftm-btn ${isSaved ? "ftm-btn--accent" : ""}`}
            onClick={toggleSave}
          >
            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            {isSaved ? tx("saved") : tx("saveCard")}
          </button>
        </div>
        <p className="ftm-text-muted ftm-mt">{tx("swipeNext")}</p>
      </section>
    </motion.div>
  );
}
