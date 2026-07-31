import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { ORGANS } from "../data/organs.js";

/** Mobile/tablet bottom sheet: collapsed | half | full */
export default function MobileSheet({
  organId,
  sheet,
  setSheet,
  onClose,
  onPlayGame,
  onOpenLesson,
}) {
  const organ = organId ? ORGANS[organId] : null;
  const startY = useRef(null);

  if (!organId || !organ) return null;

  const playCard = organ.stories?.find((s) => s.type === "play");
  const fact = organ.stories?.[0];

  return (
    <AnimatePresence>
      <motion.div
        className={`bw-sheet is-${sheet}`}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 320 }}
        onTouchStart={(e) => {
          startY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (startY.current == null) return;
          const dy = e.changedTouches[0].clientY - startY.current;
          if (dy > 48) {
            if (sheet === "full") setSheet("half");
            else if (sheet === "half") setSheet("collapsed");
            else onClose();
          } else if (dy < -48) {
            if (sheet === "collapsed") setSheet("half");
            else setSheet("full");
          }
          startY.current = null;
        }}
      >
        <button
          type="button"
          className="bw-sheet__handle"
          aria-label="Resize sheet"
          onClick={() =>
            setSheet((s) => (s === "collapsed" ? "half" : s === "half" ? "full" : "collapsed"))
          }
        />
        <div className="bw-sheet__bar">
          <span className="bw-display">{organ.name}</span>
          <button type="button" className="bw-overlay-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {sheet !== "collapsed" && (
          <div className="bw-sheet__content">
            <p className="bw-rail__summary-body">{organ.guide}</p>
            <p className="bw-rail__meta">
              <strong>Location:</strong> {organ.location}
            </p>
            {fact && sheet === "full" && (
              <div className="bw-rail__card">
                <p className="bw-rail__card-title">{fact.title}</p>
                <p className="bw-rail__summary-body">{fact.body}</p>
              </div>
            )}
            <div className="bw-rail__actions">
              <button type="button" className="bw-chip" onClick={() => onOpenLesson(organ.id)}>
                Open lesson
              </button>
              {playCard && (
                <button type="button" className="bw-chip is-on" onClick={() => onPlayGame(playCard.game)}>
                  <Play size={12} /> Play
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
