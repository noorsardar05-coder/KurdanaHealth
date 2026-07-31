import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { ORGANS } from "../data/organs.js";
import { JOURNEYS, textOf } from "../data/journeys.js";

function HeartbeatSound({ active }) {
  useEffect(() => {
    if (!active) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    let alive = true;
    const thump = () => {
      if (!alive) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(72, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 0.14);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.22);
    };
    thump();
    const id = setInterval(thump, 820);
    return () => {
      alive = false;
      clearInterval(id);
      ctx.close();
    };
  }, [active]);
  return null;
}

export default function OrganStory({ organId, lang, onClose, onPlay, onComplete }) {
  const organ = organId ? ORGANS[organId] : null;
  const journey = organId ? JOURNEYS[organId] : null;
  const cards = journey?.cards || [];
  const [i, setI] = useState(0);
  const [sound, setSound] = useState(organId === "heart");

  useEffect(() => {
    setI(0);
    setSound(organId === "heart");
  }, [organId]);

  if (!organ || !journey) return null;
  const card = cards[i];
  const isLast = i >= cards.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        className="bw-journey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label={organ.name}
      >
        <HeartbeatSound active={sound && organId === "heart"} />
        <div className="bw-journey__veil" style={{ ["--bw-accent"]: organ.accent }} />
        <motion.div
          className="bw-journey__stage"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
        >
          <header className="bw-journey__head">
            <div>
              <p className="bw-journey__kicker">{organ.name}</p>
              <h2 className="bw-display bw-journey__title">{textOf(journey.title, lang)}</h2>
              <p className="bw-journey__whisper">{textOf(journey.whisper, lang)}</p>
            </div>
            <button type="button" className="bw-glass-btn" onClick={onClose} aria-label="Return">
              <X size={16} />
            </button>
          </header>

          <AnimatePresence mode="wait">
            {card && (
              <motion.article
                key={`${organId}-${i}`}
                className={`bw-journey__card kind-${card.kind}`}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.35 }}
              >
                <p className="bw-journey__card-kind">{textOf(card.title, lang)}</p>
                <p className="bw-journey__card-body">{textOf(card.body, lang)}</p>
                {card.kind === "play" && card.game && (
                  <button
                    type="button"
                    className="bw-entry__cta"
                    onClick={() => onPlay?.(card.game)}
                  >
                    <Play size={14} /> {lang === "ku" ? "دەستپێبکە" : "Start challenge"}
                  </button>
                )}
              </motion.article>
            )}
          </AnimatePresence>

          <footer className="bw-journey__nav">
            <div className="bw-journey__dots">
              {cards.map((_, idx) => (
                <span key={idx} className={idx === i ? "is-on" : ""} />
              ))}
            </div>
            <div className="bw-journey__actions">
              {organId === "heart" && (
                <button type="button" className="bw-glass-chip" onClick={() => setSound((s) => !s)}>
                  {sound ? (lang === "ku" ? "بێدەنگ" : "Mute") : lang === "ku" ? "لیدان" : "Beat"}
                </button>
              )}
              <button
                type="button"
                className="bw-glass-chip"
                disabled={i <= 0}
                onClick={() => setI((v) => v - 1)}
              >
                {lang === "ku" ? "دواوە" : "Back"}
              </button>
              <button
                type="button"
                className="bw-glass-chip is-on"
                onClick={() => {
                  if (isLast) {
                    onComplete?.(organId);
                    onClose?.();
                  } else setI((v) => v + 1);
                }}
              >
                {isLast
                  ? lang === "ku"
                    ? "تەواو · +XP"
                    : "Complete · +XP"
                  : lang === "ku"
                    ? "دواتر"
                    : "Next"}
              </button>
            </div>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
