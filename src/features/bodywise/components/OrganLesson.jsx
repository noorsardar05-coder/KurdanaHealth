import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Shuffle } from "lucide-react";
import { shuffle } from "../data/facts.js";
import { s } from "../data/ui.js";

const TABS = [
  { id: "learn", labelKey: "sectionLearn" },
  { id: "myth", labelKey: "sectionMyth" },
  { id: "facts", labelKey: "sectionFacts" },
  { id: "habits", labelKey: "sectionHabits" },
  { id: "quiz", labelKey: "sectionQuiz" },
];

export default function OrganLesson({
  organ,
  lang,
  state,
  onBack,
  onSectionDone,
  onQuizDone,
}) {
  const [tab, setTab] = useState("learn");
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [factSeed, setFactSeed] = useState(0);

  const facts = useMemo(
    () => shuffle(organ.didYouKnow),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [organ.id, factSeed]
  );

  const question = organ.quiz[qIndex];
  const alreadyQuiz = (state.quizDone || []).includes(organ.id);

  const mark = (suffix, xp = 12) => {
    const lessonId = `${organ.id}:${suffix}`;
    if ((state.lessonsDone || []).includes(lessonId)) return;
    onSectionDone(lessonId, xp, organ.id);
  };

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === question.answer;
    if (ok) setScore((s0) => s0 + 1);
  };

  const nextQ = () => {
    if (qIndex + 1 >= organ.quiz.length) {
      setQuizDone(true);
      if (!alreadyQuiz) {
        onQuizDone(organ.id, 20 + score * 8);
      }
      return;
    }
    setQIndex((n) => n + 1);
    setPicked(null);
  };

  return (
    <motion.div
      className="bw-lesson"
      initial={{ opacity: 0, x: lang === "ku" ? -24 : 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: lang === "ku" ? 24 : -24 }}
    >
      <header className="bw-lesson-head" style={{ "--oc": organ.color }}>
        <button type="button" className="bw-icon-btn" onClick={onBack} aria-label={s(lang, "back")}>
          <ArrowLeft size={20} style={{ transform: lang === "ku" ? "scaleX(-1)" : undefined }} />
        </button>
        <div>
          <h2>
            <span>{organ.icon}</span> {organ.name[lang]}
          </h2>
          <p>{organ.subtitle[lang]}</p>
        </div>
      </header>

      <nav className="bw-tabs" aria-label="sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tab === t.id ? "is-active" : ""}
            onClick={() => setTab(t.id)}
          >
            {s(lang, t.labelKey)}
          </button>
        ))}
      </nav>

      <div className="bw-lesson-body">
        <AnimatePresence mode="wait">
          {tab === "learn" && (
            <motion.section
              key="learn"
              className="bw-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h3>{s(lang, "whatIs")}</h3>
              <p className="bw-lead">{organ.whatIs[lang]}</p>
              <h3>{s(lang, "whatDoes")}</h3>
              <p className="bw-lead">{organ.whatDoes[lang]}</p>
              <h3>{s(lang, "amazing")}</h3>
              <ul className="bw-fact-list">
                {organ.amazingFacts.map((f, i) => (
                  <li key={i}>
                    <span>{organ.icon}</span>
                    <span>{f[lang]}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="bw-btn bw-btn-soft" onClick={() => mark("learn")}>
                <Check size={16} /> {s(lang, "markDone")}
              </button>
            </motion.section>
          )}

          {tab === "myth" && (
            <motion.section
              key="myth"
              className="bw-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h3>{s(lang, "mythVsFact")}</h3>
              <div className="bw-myth-card is-myth">
                <span>❌ {s(lang, "myth")}</span>
                <p>{organ.myth.myth[lang]}</p>
              </div>
              <div className="bw-myth-card is-fact">
                <span>✅ {s(lang, "fact")}</span>
                <p>{organ.myth.fact[lang]}</p>
              </div>
              <button type="button" className="bw-btn bw-btn-soft" onClick={() => mark("myth", 15)}>
                <Check size={16} /> {s(lang, "markDone")}
              </button>
            </motion.section>
          )}

          {tab === "facts" && (
            <motion.section
              key="facts"
              className="bw-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="bw-panel-row">
                <h3>{s(lang, "didYouKnow")}</h3>
                <button
                  type="button"
                  className="bw-chip-btn"
                  onClick={() => setFactSeed((n) => n + 1)}
                >
                  <Shuffle size={14} /> {s(lang, "shuffleFacts")}
                </button>
              </div>
              <ul className="bw-fact-list bw-fact-list-alive">
                {facts.map((f, i) => (
                  <motion.li
                    key={`${factSeed}-${i}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span>✨</span>
                    <span>{f[lang]}</span>
                  </motion.li>
                ))}
              </ul>
              <button type="button" className="bw-btn bw-btn-soft" onClick={() => mark("facts")}>
                <Check size={16} /> {s(lang, "markDone")}
              </button>
            </motion.section>
          )}

          {tab === "habits" && (
            <motion.section
              key="habits"
              className="bw-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h3>{s(lang, "habits")}</h3>
              <ul className="bw-habit-list">
                {organ.habits.map((h, i) => (
                  <li key={i}>
                    <span>{h.icon}</span>
                    <span>{h[lang]}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className="bw-btn bw-btn-soft" onClick={() => mark("habits")}>
                <Check size={16} /> {s(lang, "markDone")}
              </button>
            </motion.section>
          )}

          {tab === "quiz" && (
            <motion.section
              key="quiz"
              className="bw-panel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <h3>{s(lang, "quiz")}</h3>
              {!quizDone ? (
                <>
                  <p className="bw-muted">
                    {s(lang, "stepOf", { n: qIndex + 1, t: organ.quiz.length })}
                  </p>
                  <p className="bw-quiz-q">{question.q[lang]}</p>
                  <div className="bw-quiz-opts">
                    {question.options.map((opt, i) => {
                      let cls = "bw-quiz-opt";
                      if (picked !== null) {
                        if (i === question.answer) cls += " is-correct";
                        else if (i === picked) cls += " is-wrong";
                      }
                      return (
                        <button key={i} type="button" className={cls} onClick={() => answer(i)}>
                          {opt[lang]}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== null && (
                    <div className="bw-quiz-feedback">
                      <p>
                        {picked === question.answer ? s(lang, "correct") : s(lang, "wrong")}
                      </p>
                      <button type="button" className="bw-btn bw-btn-primary" onClick={nextQ}>
                        {qIndex + 1 >= organ.quiz.length ? s(lang, "finish") : s(lang, "next")}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bw-quiz-done">
                  <p className="bw-display-sm">{s(lang, "greatJob")}</p>
                  <p>
                    {s(lang, "score")}: {score}/{organ.quiz.length}
                  </p>
                  {alreadyQuiz ? null : (
                    <p className="bw-xp-pill">{s(lang, "xpGain", { n: 20 + score * 8 })}</p>
                  )}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
