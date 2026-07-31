import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bookmark, Check } from "lucide-react";
import { t } from "../i18n/strings.js";
import { DISCLAIMER, getRelatedTopics, getTopic } from "../data/library.js";
import {
  loadLibrary,
  markQuizDone,
  markTopicViewed,
  toggleSavedTopic,
} from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

function L(lang, obj) {
  if (!obj) return "";
  return lang === "ku" ? obj.ku : obj.en;
}

function Quiz({ topic, lang, onDone }) {
  const tx = (k, vars) => t(k, lang, vars);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = topic.quiz[i];
  const total = topic.quiz.length;

  function choose(idx) {
    if (picked != null) return;
    softHaptic();
    setPicked(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function next() {
    softHaptic();
    if (i + 1 >= total) {
      markQuizDone(topic.id, score, total);
      setDone(true);
      onDone?.(score, total);
      return;
    }
    setI((x) => x + 1);
    setPicked(null);
  }

  if (done) {
    return (
      <div className="mh-quiz mh-quiz--done">
        <p className="mh-display">{tx("quizScore", { n: score, t: total })}</p>
        <button type="button" className="mh-ghost-cta" onClick={() => {
          setI(0); setPicked(null); setScore(0); setDone(false);
        }}>
          {tx("quizRetry")}
        </button>
      </div>
    );
  }

  return (
    <div className="mh-quiz">
      <p className="mh-quiz__progress">
        {i + 1} / {total}
      </p>
      <h4 className="mh-display mh-quiz__q">{L(lang, q.q)}</h4>
      <div className="mh-quiz__options">
        {q.options.map((opt, idx) => {
          let cls = "mh-quiz__opt";
          if (picked != null) {
            if (idx === q.correct) cls += " is-correct";
            else if (idx === picked) cls += " is-wrong";
          }
          return (
            <button key={idx} type="button" className={cls} onClick={() => choose(idx)} disabled={picked != null}>
              {L(lang, opt)}
            </button>
          );
        })}
      </div>
      {picked != null && (
        <div className="mh-quiz__feedback">
          <p className="mh-quiz__verdict">
            {picked === q.correct ? tx("quizCorrect") : tx("quizWrong")}
          </p>
          <p>{L(lang, q.explain)}</p>
          <button type="button" className="mh-big-cta" onClick={next}>
            {i + 1 >= total ? tx("quizFinish") : tx("quizNext")}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Learn({ lang, topicId, onBack, onOpenTopic }) {
  const tx = (k) => t(k, lang);
  const topic = getTopic(topicId);
  const [lib, setLib] = useState(() => loadLibrary());

  useEffect(() => {
    if (topicId) setLib(markTopicViewed(topicId));
  }, [topicId]);

  const related = useMemo(() => (topic ? getRelatedTopics(topic.id) : []), [topic]);
  const saved = (lib.saved || []).includes(topicId);

  if (!topic) {
    return (
      <section className="mh-panel">
        <button type="button" className="mh-text-link" onClick={onBack}>
          <ArrowLeft size={16} /> {tx("back")}
        </button>
        <p className="mh-muted">{tx("noResults")}</p>
      </section>
    );
  }

  return (
    <section className="mh-topic" style={{ "--topic-hue": topic.hue, "--topic-accent": topic.accent }}>
      <div className="mh-topic__top">
        <button type="button" className="mh-text-link" onClick={onBack}>
          <ArrowLeft size={16} /> {tx("back")}
        </button>
        <button
          type="button"
          className={`mh-pill ${saved ? "mh-pill--accent" : ""}`}
          onClick={() => {
            softHaptic();
            setLib(toggleSavedTopic(topic.id));
          }}
        >
          <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
          {saved ? tx("saved") : tx("markSaved")}
        </button>
      </div>

      <header className="mh-topic__hero">
        <div className="mh-topic__orb" aria-hidden="true" />
        <h1 className="mh-display">{L(lang, topic.title)}</h1>
        <p className="mh-topic__subtitle">{L(lang, topic.subtitle)}</p>
      </header>

      <article className="mh-topic__section glass">
        <p>{L(lang, topic.explanation)}</p>
      </article>

      <article className="mh-topic__section">
        <h2 className="mh-dash__section-title">{tx("commonSymptoms")}</h2>
        <ul className="mh-topic__list">
          {topic.symptoms.map((s, i) => (
            <li key={i}>
              <Check size={14} /> {L(lang, s)}
            </li>
          ))}
        </ul>
      </article>

      <article className="mh-topic__section">
        <h2 className="mh-dash__section-title">{tx("mythsFacts")}</h2>
        <div className="mh-myths">
          {topic.myths.map((m, i) => (
            <div key={i} className="mh-myth-card">
              <div>
                <span className="mh-myth-card__tag is-myth">{tx("myth")}</span>
                <p>{L(lang, m.myth)}</p>
              </div>
              <div>
                <span className="mh-myth-card__tag is-fact">{tx("fact")}</span>
                <p>{L(lang, m.fact)}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="mh-topic__section glass mh-topic__help">
        <h2 className="mh-dash__section-title">{tx("whenSeekHelp")}</h2>
        <p>{L(lang, topic.seekHelp)}</p>
      </article>

      <article className="mh-topic__section">
        <h2 className="mh-dash__section-title">{tx("copingIdeas")}</h2>
        <ol className="mh-topic__coping">
          {topic.coping.map((c, i) => (
            <li key={i}>{L(lang, c)}</li>
          ))}
        </ol>
      </article>

      <article className="mh-topic__section mh-topic__tip">
        <h2 className="mh-dash__section-title">{tx("dailyTip")}</h2>
        <p className="mh-display">{L(lang, topic.dailyTip)}</p>
      </article>

      <article className="mh-topic__section">
        <h2 className="mh-dash__section-title">{tx("quizTitle")}</h2>
        <Quiz topic={topic} lang={lang} />
      </article>

      {related.length > 0 && (
        <article className="mh-topic__section">
          <h2 className="mh-dash__section-title">{tx("relatedTopics")}</h2>
          <div className="mh-topic-rail">
            {related.map((r) => (
              <button
                key={r.id}
                type="button"
                className="mh-topic-card mh-topic-card--rail"
                style={{ "--topic-hue": r.hue }}
                onClick={() => {
                  softHaptic();
                  onOpenTopic?.(r.id);
                }}
              >
                <span className="mh-topic-card__title">{L(lang, r.title)}</span>
                <span className="mh-topic-card__sub">{L(lang, r.subtitle)}</span>
              </button>
            ))}
          </div>
        </article>
      )}

      <p className="mh-library__disclaimer">{L(lang, DISCLAIMER)}</p>
    </section>
  );
}
