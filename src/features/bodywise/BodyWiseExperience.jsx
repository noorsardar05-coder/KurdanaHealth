import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gamepad2,
  LogOut,
  Route,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.jsx";
import {
  addXp,
  completionPct,
  levelProgress,
  loadBodyWise,
  saveBodyWise,
  touchStreak,
} from "./utils/storage.js";
import { ORGANS, getOrgan } from "./data/organs.js";
import { TIMELINES } from "./data/timelines.js";
import { factOfTheDay } from "./data/facts.js";
import { s } from "./data/ui.js";
import EntryGate from "./components/EntryGate.jsx";
import OrganCard from "./components/OrganCard.jsx";
import OrganLesson from "./components/OrganLesson.jsx";
import GamesHub from "./components/GamesHub.jsx";
import BodyTimeline from "./components/BodyTimeline.jsx";
import AchievementsPanel from "./components/AchievementsPanel.jsx";
import SurpriseMe from "./components/SurpriseMe.jsx";
import "./bodywise.css";

export default function BodyWiseExperience() {
  const { language, setLanguage } = useLanguage();
  const lang = language === "ku" ? "ku" : "en";

  const [entered, setEntered] = useState(false);
  const [view, setView] = useState("home");
  const [organId, setOrganId] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [query, setQuery] = useState("");
  const [state, setState] = useState(() => loadBodyWise());
  const [toast, setToast] = useState(null);
  const [timelineId, setTimelineId] = useState(TIMELINES[0].id);

  const daily = useMemo(() => factOfTheDay(), []);

  useEffect(() => {
    setState((s0) => {
      const next = touchStreak(s0);
      saveBodyWise(next);
      return next;
    });
  }, []);

  useEffect(() => {
    saveBodyWise(state);
  }, [state]);

  useEffect(() => {
    const id = "bw-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Sora:wght@500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ORGANS;
    return ORGANS.filter((o) => {
      const hay = `${o.name.en} ${o.name.ku} ${o.subtitle.en} ${o.subtitle.ku} ${o.id}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const organ = organId ? getOrgan(organId) : null;
  const timeline = TIMELINES.find((t) => t.id === timelineId) || TIMELINES[0];
  const pct = completionPct(state, ORGANS.length);
  const progress = levelProgress(state.xp || 0);

  const reward = (amount, meta = {}) => {
    setState((s0) => {
      const next = addXp(s0, amount, meta);
      const gained = (next.achievements || []).filter(
        (a) => !(s0.achievements || []).includes(a)
      );
      if (gained.length) {
        flash(lang === "ku" ? "نیشانەی نوێ!" : "New badge!");
      } else if (amount > 0) {
        flash(s(lang, "xpGain", { n: amount }));
      }
      return next;
    });
  };

  return (
    <div
      className={`bw bw-edu ${lang === "ku" ? "is-ku" : ""} ${entered ? "is-entered" : ""}`}
      dir={lang === "ku" ? "rtl" : "ltr"}
    >
      <div className="bw-ambience" aria-hidden="true" />

      <AnimatePresence>
        {!entered && (
          <EntryGate
            lang={lang}
            onEnter={() => {
              setEntered(true);
              setState((s0) => ({ ...s0, enteredOnce: true }));
            }}
          />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <header className="bw-topbar">
            <div className="bw-brand-block">
              <span className="bw-brand-mark">🫀</span>
              <div>
                <strong className="bw-display-sm">{s(lang, "brand")}</strong>
                <div className="bw-stats-inline">
                  <span>{s(lang, "level", { n: state.level || 1 })}</span>
                  <span>·</span>
                  <span>{s(lang, "xpLabel", { n: state.xp || 0 })}</span>
                  <span>·</span>
                  <span>{s(lang, "streak", { n: state.streak || 0 })}</span>
                </div>
              </div>
            </div>

            <div className="bw-top-actions">
              <div className="bw-lang">
                <button
                  type="button"
                  className={lang === "en" ? "is-on" : ""}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={lang === "ku" ? "is-on" : ""}
                  onClick={() => setLanguage("ku")}
                >
                  KU
                </button>
              </div>
              <Link to="/dashboard" className="bw-icon-btn" aria-label={s(lang, "dashboard")}>
                <LogOut size={18} />
              </Link>
            </div>
          </header>

          <div className="bw-xp-rail" aria-hidden="true">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>

          <AnimatePresence mode="wait">
            {organ ? (
              <OrganLesson
                key={organ.id}
                organ={organ}
                lang={lang}
                state={state}
                onBack={() => setOrganId(null)}
                onSectionDone={(lessonId, xp, oid) => reward(xp, { lessonId, organId: oid })}
                onQuizDone={(oid, xp) => reward(xp, { quizId: oid, organId: oid, lessonId: `${oid}:quiz` })}
              />
            ) : gameId ? (
              <GamesHub
                key={gameId}
                lang={lang}
                gameId={gameId}
                onSelect={setGameId}
                onClose={() => setGameId(null)}
                onComplete={(id, xp) => {
                  setState((s0) => {
                    if ((s0.gamesDone || []).includes(id)) {
                      flash(s(lang, "alreadyDone"));
                      return s0;
                    }
                    const next = addXp(s0, xp, { gameId: id });
                    flash(s(lang, "xpGain", { n: xp }));
                    return next;
                  });
                }}
              />
            ) : (
              <motion.main
                key={view}
                className="bw-main"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                {view === "home" && (
                  <>
                    <section className="bw-daily">
                      <div className="bw-daily-card">
                        <span className="bw-daily-label">
                          <Sparkles size={14} /> {s(lang, "factOfDay")}
                        </span>
                        <p>{daily[lang]}</p>
                        <div className="bw-daily-meta">
                          <span>
                            {s(lang, "progress")}: {pct}%
                          </span>
                        </div>
                      </div>
                    </section>

                    <section className="bw-search-wrap">
                      <Search size={16} className="bw-search-icon" />
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={s(lang, "search")}
                        className="bw-search"
                        aria-label={s(lang, "search")}
                      />
                    </section>

                    <section>
                      <h2 className="bw-section-title">{s(lang, "organs")}</h2>
                      {filtered.length === 0 ? (
                        <p className="bw-muted">{s(lang, "noResults")}</p>
                      ) : (
                        <div className="bw-organ-grid">
                          {filtered.map((o, i) => (
                            <OrganCard
                              key={o.id}
                              organ={o}
                              lang={lang}
                              state={state}
                              index={i}
                              onOpen={setOrganId}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  </>
                )}

                {view === "games" && (
                  <GamesHub
                    lang={lang}
                    gameId={null}
                    onSelect={setGameId}
                    onClose={() => setGameId(null)}
                    onComplete={() => {}}
                  />
                )}

                {view === "journeys" && (
                  <section className="bw-journeys">
                    <h2 className="bw-section-title">{s(lang, "timelines")}</h2>
                    <div className="bw-journey-tabs">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className={timelineId === t.id ? "is-active" : ""}
                          onClick={() => setTimelineId(t.id)}
                        >
                          {t.icon} {t.title[lang]}
                        </button>
                      ))}
                    </div>
                    <BodyTimeline timeline={timeline} lang={lang} />
                  </section>
                )}

                {view === "badges" && <AchievementsPanel lang={lang} state={state} />}
              </motion.main>
            )}
          </AnimatePresence>

          {!organ && !gameId && (
            <nav className="bw-dock" aria-label="BodyWise navigation">
              <button
                type="button"
                className={view === "home" ? "is-on" : ""}
                onClick={() => setView("home")}
              >
                <Sparkles size={18} />
                <span>{s(lang, "home")}</span>
              </button>
              <button
                type="button"
                className={view === "games" ? "is-on" : ""}
                onClick={() => setView("games")}
              >
                <Gamepad2 size={18} />
                <span>{s(lang, "games")}</span>
              </button>
              <button
                type="button"
                className={view === "journeys" ? "is-on" : ""}
                onClick={() => setView("journeys")}
              >
                <Route size={18} />
                <span>{s(lang, "timelines")}</span>
              </button>
              <button
                type="button"
                className={view === "badges" ? "is-on" : ""}
                onClick={() => setView("badges")}
              >
                <Trophy size={18} />
                <span>{s(lang, "achievements")}</span>
              </button>
            </nav>
          )}

          {!organ && !gameId && <SurpriseMe lang={lang} />}

          <AnimatePresence>
            {toast && (
              <motion.div
                className="bw-toast"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
