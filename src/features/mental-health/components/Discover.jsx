import { useMemo, useState } from "react";
import { Search, Bookmark, BookOpen, Sparkles } from "lucide-react";
import { t } from "../i18n/strings.js";
import {
  DISCLAIMER,
  LIBRARY_CATEGORIES,
  LIBRARY_TOPICS,
  getTopic,
  searchTopics,
} from "../data/library.js";
import {
  loadLibrary,
  topicProgressPct,
  toggleSavedTopic,
} from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

function L(lang, obj) {
  return lang === "ku" ? obj.ku : obj.en;
}

export default function Discover({ lang, onOpenTopic }) {
  const tx = (k, vars) => t(k, lang, vars);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [lib, setLib] = useState(() => loadLibrary());

  const explored = Object.keys(lib.progress || {}).length;
  const quizzes = Object.keys(lib.quiz || {}).length;

  const filtered = useMemo(() => {
    let list = query.trim() ? searchTopics(query, lang) : LIBRARY_TOPICS;
    if (category !== "all") list = list.filter((t) => t.category === category);
    return list;
  }, [query, category, lang]);

  const continueIds = (lib.viewed || []).slice(0, 6);
  const savedIds = lib.saved || [];

  function openTopic(id) {
    softHaptic();
    onOpenTopic?.(id);
  }

  function toggleSave(e, id) {
    e.stopPropagation();
    softHaptic();
    setLib(toggleSavedTopic(id));
  }

  return (
    <section className="mh-library">
      <header className="mh-library__hero">
        <p className="mh-dash__eyebrow">
          <Sparkles size={14} /> {tx("learn")}
        </p>
        <h2 className="mh-display mh-library__title">{tx("discoverHero")}</h2>
        <p className="mh-library__sub">{tx("discoverHeroSub")}</p>
      </header>

      <label className="mh-search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={tx("search")}
          dir={lang === "ku" ? "rtl" : "ltr"}
          aria-label={tx("search")}
        />
      </label>

      <div className="mh-progress-strip" aria-label={tx("yourProgress")}>
        <div className="mh-progress-pill">
          <BookOpen size={16} />
          <span>
            <strong>{explored}</strong> {tx("topicsExplored")}
          </span>
        </div>
        <div className="mh-progress-pill">
          <Sparkles size={16} />
          <span>
            <strong>{quizzes}</strong> {tx("quizzesDone")}
          </span>
        </div>
      </div>

      {continueIds.length > 0 && (
        <div className="mh-library__block">
          <h3 className="mh-dash__section-title">{tx("continueReading")}</h3>
          <div className="mh-topic-rail">
            {continueIds.map((id) => {
              const topic = getTopic(id);
              if (!topic) return null;
              const pct = topicProgressPct(id, lib);
              return (
                <button
                  key={id}
                  type="button"
                  className="mh-topic-card mh-topic-card--rail"
                  style={{ "--topic-hue": topic.hue }}
                  onClick={() => openTopic(id)}
                >
                  <span className="mh-topic-card__glow" aria-hidden="true" />
                  <span className="mh-topic-card__title">{L(lang, topic.title)}</span>
                  <span className="mh-topic-card__sub">{L(lang, topic.subtitle)}</span>
                  <span className="mh-topic-card__bar" aria-hidden="true">
                    <span style={{ width: `${pct}%` }} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {savedIds.length > 0 && (
        <div className="mh-library__block">
          <h3 className="mh-dash__section-title">{tx("savedTopics")}</h3>
          <div className="mh-topic-rail">
            {savedIds.map((id) => {
              const topic = getTopic(id);
              if (!topic) return null;
              return (
                <button
                  key={id}
                  type="button"
                  className="mh-topic-card mh-topic-card--rail is-saved"
                  style={{ "--topic-hue": topic.hue }}
                  onClick={() => openTopic(id)}
                >
                  <Bookmark size={14} className="mh-topic-card__mark" />
                  <span className="mh-topic-card__title">{L(lang, topic.title)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mh-library__block">
        <h3 className="mh-dash__section-title">{tx("categories")}</h3>
        <div className="mh-cat-row" role="tablist">
          {LIBRARY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              className={`mh-cat-chip ${category === c.id ? "is-on" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {L(lang, c.title)}
            </button>
          ))}
        </div>
      </div>

      <div className="mh-library__block">
        <h3 className="mh-dash__section-title">{tx("allTopics")}</h3>
        {filtered.length === 0 ? (
          <p className="mh-muted">{tx("noResults")}</p>
        ) : (
          <div className="mh-topic-grid">
            {filtered.map((topic) => {
              const saved = savedIds.includes(topic.id);
              const pct = topicProgressPct(topic.id, lib);
              return (
                <article
                  key={topic.id}
                  className="mh-topic-card"
                  style={{ "--topic-hue": topic.hue }}
                >
                  <button
                    type="button"
                    className="mh-topic-card__main"
                    onClick={() => openTopic(topic.id)}
                  >
                    <span className="mh-topic-card__glow" aria-hidden="true" />
                    <span className="mh-topic-card__title">{L(lang, topic.title)}</span>
                    <span className="mh-topic-card__sub">{L(lang, topic.subtitle)}</span>
                    {pct > 0 && (
                      <span className="mh-topic-card__bar" aria-hidden="true">
                        <span style={{ width: `${pct}%` }} />
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    className={`mh-topic-card__save ${saved ? "is-on" : ""}`}
                    aria-label={saved ? tx("unsave") : tx("markSaved")}
                    onClick={(e) => toggleSave(e, topic.id)}
                  >
                    <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <p className="mh-library__disclaimer">{L(lang, DISCLAIMER)}</p>
    </section>
  );
}
