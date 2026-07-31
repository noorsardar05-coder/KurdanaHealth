import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { getOrgan } from "../data/organs.js";
import {
  DIGESTIVE_ORDER,
  GAMES,
  PUZZLE_ITEMS,
  buildGuessRounds,
  buildMatchPairs,
  buildMemoryCards,
  buildMythRounds,
  buildOrganQuiz,
} from "../data/games.js";
import { s } from "../data/ui.js";

function Shell({ lang, title, onBack, children }) {
  return (
    <div className="bw-game-shell">
      <header className="bw-game-head">
        <button type="button" className="bw-icon-btn" onClick={onBack} aria-label={s(lang, "back")}>
          <ArrowLeft size={20} style={{ transform: lang === "ku" ? "scaleX(-1)" : undefined }} />
        </button>
        <h3>{title}</h3>
      </header>
      {children}
    </div>
  );
}

function Done({ lang, xp, onBack }) {
  return (
    <div className="bw-game-done">
      <Trophy size={36} />
      <p className="bw-display-sm">{s(lang, "greatJob")}</p>
      <p className="bw-xp-pill">
        {s(lang, "youEarned")}: {s(lang, "xpGain", { n: xp })}
      </p>
      <button type="button" className="bw-btn bw-btn-primary" onClick={onBack}>
        {s(lang, "continue")}
      </button>
    </div>
  );
}

function useOnceFinish(onFinish) {
  const done = useRef(false);
  return (xp) => {
    if (done.current) return;
    done.current = true;
    onFinish(xp);
  };
}

function GuessOrgan({ lang, onFinish, onBack }) {
  const rounds = useMemo(() => buildGuessRounds(5), []);
  const finish = useOnceFinish(onFinish);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);
  const r = rounds[i];

  const pick = (id) => {
    if (picked) return;
    setPicked(id);
    if (id === r.organId) setScore((n) => n + 1);
  };

  const next = () => {
    const total = score;
    if (i + 1 >= rounds.length) {
      const reward = 15 + total * 5;
      setXp(reward);
      setDone(true);
      finish(reward);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  };

  if (done) return <Done lang={lang} xp={xp} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[0].title[lang]} onBack={onBack}>
      <p className="bw-muted">{s(lang, "stepOf", { n: i + 1, t: rounds.length })}</p>
      <p className="bw-quiz-q">{r.clue[lang]}</p>
      <div className="bw-quiz-opts">
        {r.options.map((o) => {
          let cls = "bw-quiz-opt";
          if (picked) {
            if (o.id === r.organId) cls += " is-correct";
            else if (o.id === picked) cls += " is-wrong";
          }
          return (
            <button key={o.id} type="button" className={cls} onClick={() => pick(o.id)}>
              {o.icon} {o.name[lang]}
            </button>
          );
        })}
      </div>
      {picked && (
        <button type="button" className="bw-btn bw-btn-primary" onClick={next}>
          {i + 1 >= rounds.length ? s(lang, "finish") : s(lang, "next")}
        </button>
      )}
    </Shell>
  );
}

function FactOrMyth({ lang, onFinish, onBack }) {
  const rounds = useMemo(() => buildMythRounds(6), []);
  const finish = useOnceFinish(onFinish);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);
  const r = rounds[i];

  const choose = (isMyth) => {
    if (picked !== null) return;
    setPicked(isMyth);
    if (isMyth === r.isMyth) setScore((n) => n + 1);
  };

  const next = () => {
    if (i + 1 >= rounds.length) {
      const reward = 15 + score * 5;
      setXp(reward);
      setDone(true);
      finish(reward);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  };

  if (done) return <Done lang={lang} xp={xp} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[1].title[lang]} onBack={onBack}>
      <p className="bw-muted">{s(lang, "stepOf", { n: i + 1, t: rounds.length })}</p>
      <p className="bw-quiz-q">{r.statement[lang]}</p>
      <div className="bw-myth-btns">
        <button
          type="button"
          className={`bw-btn ${picked === true ? (r.isMyth ? "bw-btn-primary" : "bw-btn-danger") : "bw-btn-soft"}`}
          onClick={() => choose(true)}
        >
          ❌ {s(lang, "mythBtn")}
        </button>
        <button
          type="button"
          className={`bw-btn ${picked === false ? (!r.isMyth ? "bw-btn-primary" : "bw-btn-danger") : "bw-btn-soft"}`}
          onClick={() => choose(false)}
        >
          ✅ {s(lang, "factBtn")}
        </button>
      </div>
      {picked !== null && (
        <>
          <p className="bw-lead">{r.reveal[lang]}</p>
          <button type="button" className="bw-btn bw-btn-primary" onClick={next}>
            {i + 1 >= rounds.length ? s(lang, "finish") : s(lang, "next")}
          </button>
        </>
      )}
    </Shell>
  );
}

function MatchFunction({ lang, onFinish, onBack }) {
  const pairs = useMemo(() => buildMatchPairs(4), []);
  const funcs = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [pairs]);
  const finish = useOnceFinish(onFinish);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [matched, setMatched] = useState({});
  const [done, setDone] = useState(false);

  const pickFunc = (id) => {
    if (!selectedOrg || matched[id]) return;
    if (selectedOrg === id) {
      const next = { ...matched, [id]: true };
      setMatched(next);
      setSelectedOrg(null);
      if (Object.keys(next).length === pairs.length) {
        setDone(true);
        finish(30);
      }
    } else {
      setSelectedOrg(null);
    }
  };

  if (done) return <Done lang={lang} xp={30} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[2].title[lang]} onBack={onBack}>
      <p className="bw-muted">{s(lang, "matchPairs")}</p>
      <div className="bw-match-grid">
        <div>
          {pairs.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={!!matched[p.id]}
              className={`bw-match-item ${selectedOrg === p.id ? "is-on" : ""} ${matched[p.id] ? "is-done" : ""}`}
              onClick={() => setSelectedOrg(p.id)}
            >
              {p.icon} {p.name[lang]}
            </button>
          ))}
        </div>
        <div>
          {funcs.map((p) => (
            <button
              key={`f-${p.id}`}
              type="button"
              disabled={!!matched[p.id]}
              className={`bw-match-item ${matched[p.id] ? "is-done" : ""}`}
              onClick={() => pickFunc(p.id)}
            >
              {p.function[lang]}
            </button>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function DigestiveJourney({ lang, onFinish, onBack }) {
  const finish = useOnceFinish(onFinish);
  const [order, setOrder] = useState(() => [...DIGESTIVE_ORDER].sort(() => Math.random() - 0.5));
  const [built, setBuilt] = useState([]);
  const [done, setDone] = useState(false);

  const tap = (item) => {
    if (built.find((b) => b.id === item.id)) return;
    const correct = DIGESTIVE_ORDER[built.length];
    if (item.id !== correct.id) return;
    const next = [...built, item];
    setBuilt(next);
    setOrder((o) => o.filter((x) => x.id !== item.id));
    if (next.length === DIGESTIVE_ORDER.length) {
      setDone(true);
      finish(30);
    }
  };

  if (done) return <Done lang={lang} xp={30} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[3].title[lang]} onBack={onBack}>
      <p className="bw-muted">{s(lang, "putInOrder")}</p>
      <div className="bw-build-path">
        {built.map((b) => (
          <div key={b.id} className="bw-build-step is-on">
            {b.icon} {b.title[lang]}
          </div>
        ))}
      </div>
      <div className="bw-build-pool">
        {order.map((item) => (
          <button key={item.id} type="button" className="bw-chip-btn" onClick={() => tap(item)}>
            {item.icon} {item.title[lang]}
          </button>
        ))}
      </div>
    </Shell>
  );
}

function MemoryGame({ lang, onFinish, onBack }) {
  const finish = useOnceFinish(onFinish);
  const [cards] = useState(() => buildMemoryCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [done, setDone] = useState(false);

  const flip = (key, pairId) => {
    if (lock || flipped.includes(key) || matched.includes(pairId)) return;
    const next = [...flipped, key];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = next.map((k) => cards.find((c) => c.key === k));
      if (a.pairId === b.pairId) {
        const nextMatched = [...matched, a.pairId];
        setMatched(nextMatched);
        setFlipped([]);
        setLock(false);
        if (nextMatched.length >= cards.length / 2) {
          setDone(true);
          finish(30);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLock(false);
        }, 700);
      }
    }
  };

  if (done) return <Done lang={lang} xp={30} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[4].title[lang]} onBack={onBack}>
      <p className="bw-muted">
        {s(lang, "moves")}: {moves}
      </p>
      <div className="bw-memory-grid">
        {cards.map((c) => {
          const show = flipped.includes(c.key) || matched.includes(c.pairId);
          return (
            <button
              key={c.key}
              type="button"
              className={`bw-mem-card ${show ? "is-show" : ""}`}
              onClick={() => flip(c.key, c.pairId)}
            >
              {show ? (c.kind === "icon" ? c.face : c.face[lang]) : "?"}
            </button>
          );
        })}
      </div>
    </Shell>
  );
}

function BodyPuzzle({ lang, onFinish, onBack }) {
  const items = useMemo(() => [...PUZZLE_ITEMS].sort(() => Math.random() - 0.5), []);
  const organs = useMemo(
    () => items.map((it) => getOrgan(it.organId)).sort(() => Math.random() - 0.5),
    [items]
  );
  const finish = useOnceFinish(onFinish);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);
  const item = items[i];

  const pick = (id) => {
    if (picked) return;
    setPicked(id);
    if (id === item.organId) setScore((n) => n + 1);
  };

  const next = () => {
    if (i + 1 >= items.length) {
      const reward = 15 + score * 5;
      setXp(reward);
      setDone(true);
      finish(reward);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  };

  if (done) return <Done lang={lang} xp={xp} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[5].title[lang]} onBack={onBack}>
      <p className="bw-muted">{s(lang, "stepOf", { n: i + 1, t: items.length })}</p>
      <p className="bw-quiz-q">{item.where[lang]}</p>
      <div className="bw-quiz-opts">
        {organs.map((o) => {
          let cls = "bw-quiz-opt";
          if (picked) {
            if (o.id === item.organId) cls += " is-correct";
            else if (o.id === picked) cls += " is-wrong";
          }
          return (
            <button key={o.id} type="button" className={cls} onClick={() => pick(o.id)}>
              {o.icon} {o.name[lang]}
            </button>
          );
        })}
      </div>
      {picked && (
        <button type="button" className="bw-btn bw-btn-primary" onClick={next}>
          {i + 1 >= items.length ? s(lang, "finish") : s(lang, "next")}
        </button>
      )}
    </Shell>
  );
}

function OrganQuizRush({ lang, onFinish, onBack }) {
  const rounds = useMemo(() => buildOrganQuiz(6), []);
  const finish = useOnceFinish(onFinish);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [done, setDone] = useState(false);
  const r = rounds[i];

  const answer = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === r.answer) setScore((n) => n + 1);
  };

  const next = () => {
    if (i + 1 >= rounds.length) {
      const reward = 20 + score * 6;
      setXp(reward);
      setDone(true);
      finish(reward);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  };

  if (done) return <Done lang={lang} xp={xp} onBack={onBack} />;

  return (
    <Shell lang={lang} title={GAMES[6].title[lang]} onBack={onBack}>
      <p className="bw-muted">
        {r.organIcon} · {s(lang, "stepOf", { n: i + 1, t: rounds.length })}
      </p>
      <p className="bw-quiz-q">{r.q[lang]}</p>
      <div className="bw-quiz-opts">
        {r.options.map((opt, idx) => {
          let cls = "bw-quiz-opt";
          if (picked !== null) {
            if (idx === r.answer) cls += " is-correct";
            else if (idx === picked) cls += " is-wrong";
          }
          return (
            <button key={idx} type="button" className={cls} onClick={() => answer(idx)}>
              {opt[lang]}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <button type="button" className="bw-btn bw-btn-primary" onClick={next}>
          {i + 1 >= rounds.length ? s(lang, "finish") : s(lang, "next")}
        </button>
      )}
    </Shell>
  );
}

const PLAYERS = {
  "guess-organ": GuessOrgan,
  "fact-or-myth": FactOrMyth,
  "match-function": MatchFunction,
  "digestive-journey": DigestiveJourney,
  memory: MemoryGame,
  "body-puzzle": BodyPuzzle,
  "organ-quiz": OrganQuizRush,
};

export default function GamesHub({ lang, gameId, onSelect, onClose, onComplete }) {
  if (gameId) {
    const Player = PLAYERS[gameId];
    if (!Player) return null;
    return (
      <motion.div className="bw-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Player lang={lang} onBack={onClose} onFinish={(xp) => onComplete(gameId, xp)} />
      </motion.div>
    );
  }

  return (
    <div className="bw-games-hub">
      <h2 className="bw-section-title">{s(lang, "games")}</h2>
      <div className="bw-games-grid">
        {GAMES.map((g, i) => (
          <motion.button
            key={g.id}
            type="button"
            className="bw-game-card"
            style={{ "--gc": g.color }}
            onClick={() => onSelect(g.id)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <span>{g.icon}</span>
            <strong>{g.title[lang]}</strong>
            <em>{g.blurb[lang]}</em>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
