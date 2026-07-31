import { useMemo, useState } from "react";
import {
  Sparkles,
  BookOpen,
  Wind,
  ShieldAlert,
  TreePine,
  Stars,
  ArrowRight,
} from "lucide-react";
import { t } from "../i18n/strings.js";
import { MOODS } from "../data/content.js";
import { pickCalmingLine, pickReflection } from "../data/reflections.js";
import { LIBRARY_TOPICS, getTopic } from "../data/library.js";
import {
  getDisplayName,
  loadLibrary,
  saveReflection,
} from "../utils/storage.js";
import { softHaptic } from "../utils/haptics.js";

function greetingKey(state) {
  if (state?.lastOpen) {
    const days = Math.floor((Date.now() - state.lastOpen) / 86400000);
    if (days >= 7) return "welcomeBack";
  }
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}

const ACTIONS = [
  { id: "mirror", icon: Sparkles, label: "qaMirror", sub: "qaMirrorSub", tone: "violet" },
  { id: "library", icon: BookOpen, label: "qaLibrary", sub: "qaLibrarySub", tone: "sage" },
  { id: "breathe", icon: Wind, label: "qaBreathe", sub: "qaBreatheSub", tone: "sky" },
  { id: "panic", icon: ShieldAlert, label: "qaPanic", sub: "qaPanicSub", tone: "rose" },
  { id: "tree", icon: TreePine, label: "qaTree", sub: "qaTreeSub", tone: "green" },
  { id: "galaxy", icon: Stars, label: "qaGalaxy", sub: "qaGalaxySub", tone: "indigo" },
];

export default function Home({ lang, state, onMood, onNavigate, onAsk, onOpenTool }) {
  const tx = (k, vars) => t(k, lang, vars);
  const name = getDisplayName(state);
  const line = useMemo(() => pickCalmingLine(), []);
  const reflectionQ = useMemo(() => pickReflection(), []);
  const [answer, setAnswer] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [lib] = useState(() => loadLibrary());

  const recent = useMemo(() => {
    return (lib.viewed || [])
      .map((id) => getTopic(id) || LIBRARY_TOPICS.find((x) => x.id === id))
      .filter(Boolean)
      .slice(0, 4);
  }, [lib]);

  const greet = lang === "ku" ? tx("welcome") : tx(greetingKey(state));
  const calming = lang === "ku" ? tx("welcomeSub") : line.en;
  const reflectText = lang === "ku" ? reflectionQ.ku : reflectionQ.en;

  function handleAction(id) {
    softHaptic();
    if (id === "mirror") onOpenTool("translator");
    else if (id === "library") onNavigate("discover");
    else if (id === "breathe") onOpenTool("breathe");
    else if (id === "panic") onOpenTool("panic");
    else if (id === "tree") onNavigate("community");
    else if (id === "galaxy") onNavigate("track");
  }

  function handleReflection() {
    if (!answer.trim()) return;
    softHaptic();
    saveReflection(reflectText, answer, lang);
    setAnswer("");
    setSavedMsg(tx("reflectionSaved"));
    window.setTimeout(() => setSavedMsg(""), 2200);
  }

  return (
    <section className="mh-dash">
      <header className="mh-dash__hero">
        <p className="mh-dash__eyebrow">{tx("space")}</p>
        <h1 className="mh-display mh-dash__greet">
          {lang === "ku" ? (
            greet
          ) : (
            <>
              {greet}
              {name ? `, ${name}.` : ""}
            </>
          )}
        </h1>
        <p className="mh-dash__line">{calming}</p>
      </header>

      <div className="mh-dash__mood-strip">
        <p className="mh-dash__section-label">{tx("energyQ")}</p>
        <div className="mh-mood-row" role="group" aria-label={tx("energyQ")}>
          {MOODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`mh-mood-chip ${state.mood === m.id ? "is-on" : ""} mood-${m.id}`}
              onClick={() => {
                softHaptic();
                onMood(m.id);
              }}
            >
              <span aria-hidden="true">{m.emoji}</span>
              <span>{tx(m.labelKey)}</span>
            </button>
          ))}
        </div>
        {state.mood && (
          <button type="button" className="mh-text-link" onClick={() => onMood(null)}>
            {tx("changeMood")}
          </button>
        )}
      </div>

      <div className="mh-dash__block">
        <h2 className="mh-dash__section-title">{tx("quickActions")}</h2>
        <div className="mh-action-grid">
          {ACTIONS.map(({ id, icon: Icon, label, sub, tone }) => (
            <button
              key={id}
              type="button"
              className={`mh-action-card tone-${tone}`}
              onClick={() => handleAction(id)}
            >
              <span className="mh-action-card__icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span className="mh-action-card__title">{tx(label)}</span>
              <span className="mh-action-card__sub">{tx(sub)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mh-dash__block">
        <div className="mh-dash__row-head">
          <h2 className="mh-dash__section-title">{tx("recentlyViewed")}</h2>
          <button type="button" className="mh-text-link" onClick={() => onNavigate("discover")}>
            {tx("discover")} <ArrowRight size={14} />
          </button>
        </div>
        {recent.length === 0 ? (
          <p className="mh-muted mh-dash__empty">{tx("emptyRecent")}</p>
        ) : (
          <div className="mh-continue-rail" role="list">
            {recent.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className="mh-continue-card"
                style={{ "--topic-hue": topic.hue }}
                role="listitem"
                onClick={() => {
                  softHaptic();
                  onNavigate("learn", topic.id);
                }}
              >
                <span className="mh-continue-card__swatch" aria-hidden="true" />
                <span className="mh-continue-card__title">
                  {lang === "ku" ? topic.title.ku : topic.title.en}
                </span>
                <span className="mh-continue-card__sub">
                  {lang === "ku" ? topic.subtitle.ku : topic.subtitle.en}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mh-dash__block mh-reflect-card">
        <p className="mh-dash__section-label">{tx("todayReflection")}</p>
        <h3 className="mh-display mh-reflect-card__q">{reflectText}</h3>
        <textarea
          className="mh-input mh-reflect-card__input"
          rows={3}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={tx("reflectionPh")}
          dir={lang === "ku" ? "rtl" : "ltr"}
          maxLength={400}
        />
        <button
          type="button"
          className="mh-big-cta"
          disabled={!answer.trim()}
          onClick={handleReflection}
        >
          {tx("reflectionSave")}
        </button>
        {savedMsg ? <p className="mh-muted">{savedMsg}</p> : null}
        <button type="button" className="mh-ghost-cta" onClick={onAsk}>
          {tx("talk")}
        </button>
      </div>
    </section>
  );
}
