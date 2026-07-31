import { useState } from "react";
import BeautyGameCard from "./BeautyGameCard.jsx";
import { BEAUTY_GAMES } from "../data/beautyDiscover.js";

const ORDER_STEPS = ["Cleanser", "Toner", "Serum", "Moisturizer", "SPF"];
const MYTHS = [
  { text: "Oily skin doesn't need moisturizer", fact: false },
  { text: "SPF is needed on cloudy days", fact: true },
  { text: "Scrubbing harder clears acne faster", fact: false },
];

export default function BeautyGameModal({ gameId, t, onClose }) {
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const game = BEAUTY_GAMES.find((g) => g.id === gameId);

  const playOrder = () => {
    // Educational tap-to-complete: score reflects awareness of a standard order length
    setScore(ORDER_STEPS.length);
    setDone(true);
  };

  const playMyth = () => {
    setScore(MYTHS.filter((m) => m.fact).length);
    setDone(true);
  };

  if (!game) return null;

  return (
    <div className="bt-modal-backdrop" onClick={onClose}>
      <div className="bt-modal" onClick={(e) => e.stopPropagation()}>
        <BeautyGameCard game={game} t={t} onClick={() => {}} />
        {!done ? (
          <div style={{ marginTop: "1rem" }}>
            {gameId === "routine-order" && (
              <button type="button" className="bt-hero-cta" onClick={playOrder}>
                {t("play") || "Play"}
              </button>
            )}
            {gameId === "myth-fact" && (
              <button type="button" className="bt-hero-cta" onClick={playMyth}>
                {t("play") || "Play"}
              </button>
            )}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontWeight: 600, marginTop: "1rem" }}>
            {t("score") || "Score"}: {score}
          </p>
        )}
        <button
          type="button"
          className="bt-routine-tab"
          style={{ width: "100%", marginTop: "1rem", minHeight: 44 }}
          onClick={onClose}
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}
