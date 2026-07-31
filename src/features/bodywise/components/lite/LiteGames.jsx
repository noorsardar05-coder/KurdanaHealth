import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { DETECTIVE_CLUES, LITE_ORGANS } from "../../data/organLessons.js";
import { PUZZLE_ZONES } from "../../data/liteLayers.js";

function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATALOG = [
  {
    id: "organ-hunt",
    title: { en: "Organ Hunt", ku: "ڕاوە ئەندام" },
    sub: { en: "Find the named organ on the body.", ku: "ئەندامی ناونراو لەسەر جەستە بدۆزەوە." },
  },
  {
    id: "body-puzzle",
    title: { en: "Body Puzzle", ku: "مەتەڵی جەستە" },
    sub: { en: "Snap organs only when anatomically correct.", ku: "تەنها کاتێک دروست بێت جێگیر دەبێت." },
  },
  {
    id: "organ-detective",
    title: { en: "Organ Detective", ku: "لێکۆڵەری ئەندام" },
    sub: { en: "Three clues. One organ.", ku: "سێ نیشانە. یەک ئەندام." },
  },
];

function OrganHunt({ lang, onDone }) {
  const pool = ["liver", "heart", "lungs", "stomach", "kidneys", "brain", "bladder"];
  const [target, setTarget] = useState(() => pool[0]);
  const [xp, setXp] = useState(0);
  const [msg, setMsg] = useState("");
  const choices = useMemo(() => {
    const wrong = shuffle(pool.filter((id) => id !== target)).slice(0, 3);
    return shuffle([target, ...wrong]);
  }, [target]);

  return (
    <div className="bw-lite-game">
      <div className="bw-game__hud">
        <span>
          {lang === "ku" ? "بدۆزەوە" : "Find"}: <strong>{t(LITE_ORGANS[target]?.name, lang)}</strong>
        </span>
        <span>+{xp} XP</span>
      </div>
      <p className="bw-game__prompt">{t(LITE_ORGANS[target]?.location, lang)}</p>
      <div className="bw-game__choices">
        {choices.map((id) => (
          <button
            key={id}
            type="button"
            className="bw-glass-chip"
            onClick={() => {
              if (id !== target) {
                setMsg(lang === "ku" ? "دووبارە هەوڵ بدە" : "Try again — check the location.");
                return;
              }
              const nextXp = xp + 25;
              setXp(nextXp);
              setMsg(
                lang === "ku"
                  ? `ڕاستە! ${t(LITE_ORGANS[id]?.location, lang)}`
                  : `Correct! ${t(LITE_ORGANS[id]?.location, lang)}`
              );
              const next = shuffle(pool.filter((x) => x !== target))[0] || target;
              setTarget(next);
              if (nextXp >= 100) onDone?.(nextXp);
            }}
          >
            {t(LITE_ORGANS[id]?.name, lang)}
          </button>
        ))}
      </div>
      {msg && <p className="bw-game__hint">{msg}</p>}
    </div>
  );
}

function BodyPuzzle({ lang, onDone }) {
  const pieces = useMemo(() => shuffle(["heart", "lungs", "liver", "stomach", "kidneys"]), []);
  const [placed, setPlaced] = useState({});
  const [holding, setHolding] = useState(null);
  const remaining = pieces.filter((id) => !Object.values(placed).includes(id));

  const tryPlace = (zoneId) => {
    if (!holding) return;
    const zone = PUZZLE_ZONES.find((z) => z.id === zoneId);
    if (!zone?.accepts.includes(holding)) return;
    const next = { ...placed, [zoneId]: holding };
    setPlaced(next);
    setHolding(null);
    if (Object.keys(next).length >= pieces.length) onDone?.(pieces.length * 15);
  };

  return (
    <div className="bw-lite-game">
      <p className="bw-game__prompt">
        {lang === "ku"
          ? "ئەندام هەڵبژێرە و لە شوێنی دروستی دابنێ."
          : "Pick an organ, then tap its correct region."}
      </p>
      <div className="bw-puzzle-pieces">
        {remaining.map((id) => (
          <button
            key={id}
            type="button"
            className={`bw-glass-chip ${holding === id ? "is-on" : ""}`}
            onClick={() => setHolding(id)}
          >
            {t(LITE_ORGANS[id]?.name, lang)}
          </button>
        ))}
      </div>
      <div className="bw-puzzle-zones">
        {PUZZLE_ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            className={`bw-puzzle-zone ${placed[z.id] ? "is-filled" : ""}`}
            onClick={() => tryPlace(z.id)}
          >
            {placed[z.id]
              ? t(LITE_ORGANS[placed[z.id]]?.name, lang)
              : t(z.label, lang)}
          </button>
        ))}
      </div>
    </div>
  );
}

function OrganDetective({ lang, onDone }) {
  const [deck] = useState(() => shuffle(DETECTIVE_CLUES));
  const [idx, setIdx] = useState(0);
  const [xp, setXp] = useState(0);
  const [feedback, setFeedback] = useState("");
  const card = deck[idx % deck.length];
  const options = useMemo(() => {
    const wrong = shuffle(Object.keys(LITE_ORGANS).filter((id) => id !== card.id)).slice(0, 3);
    return shuffle([card.id, ...wrong]);
  }, [card]);

  return (
    <div className="bw-lite-game">
      <div className="bw-game__hud">
        <span>{lang === "ku" ? "لێکۆڵینەوە" : "Detective"}</span>
        <span>+{xp} XP</span>
      </div>
      <ol className="bw-detective-clues">
        {(card.clues[lang] || card.clues.en).map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
      <div className="bw-game__choices">
        {options.map((id) => (
          <button
            key={id}
            type="button"
            className="bw-glass-chip"
            onClick={() => {
              if (id !== card.id) {
                setFeedback(lang === "ku" ? "نیشانەکان دووبارە بخوێنەوە." : "Re-read the clues.");
                return;
              }
              const nextXp = xp + 30;
              setXp(nextXp);
              setFeedback(
                lang === "ku"
                  ? `بەڵێ — ${t(LITE_ORGANS[id]?.name, lang)}`
                  : `Yes — ${t(LITE_ORGANS[id]?.name, lang)}`
              );
              setIdx((i) => i + 1);
              if (nextXp >= 90) onDone?.(nextXp);
            }}
          >
            {t(LITE_ORGANS[id]?.name, lang)}
          </button>
        ))}
      </div>
      {feedback && <p className="bw-game__hint">{feedback}</p>}
    </div>
  );
}

export function LiteGamesHub({ lang, onPlay }) {
  return (
    <div className="bw-games">
      <h2 className="bw-display">{lang === "ku" ? "یارییەکان" : "Play"}</h2>
      <p className="bw-games__sub">
        {lang === "ku" ? "سێ یاری فێرکاری · دروست و خێرا" : "Three learning games · accurate & fast"}
      </p>
      <div className="bw-games__grid">
        {CATALOG.map((g) => (
          <button key={g.id} type="button" className="bw-game-card" onClick={() => onPlay(g.id)}>
            <strong>{t(g.title, lang)}</strong>
            <span>{t(g.sub, lang)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function LiteGameOverlay({ gameId, lang, onClose, onComplete }) {
  const title = CATALOG.find((g) => g.id === gameId);

  return (
    <div className="bw-game-overlay" role="dialog">
      <header className="bw-game-overlay__head">
        <h2 className="bw-display">{t(title?.title, lang)}</h2>
        <button type="button" className="bw-glass-btn" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
      </header>
      {gameId === "organ-hunt" && (
        <OrganHunt lang={lang} onDone={(score) => onComplete?.(gameId, score)} />
      )}
      {gameId === "body-puzzle" && (
        <BodyPuzzle lang={lang} onDone={(score) => onComplete?.(gameId, score)} />
      )}
      {gameId === "organ-detective" && (
        <OrganDetective lang={lang} onDone={(score) => onComplete?.(gameId, score)} />
      )}
    </div>
  );
}
