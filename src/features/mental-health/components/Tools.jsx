import { useEffect, useState } from "react";
import { t } from "../i18n/strings.js";
import { SELF_CARE } from "../data/content.js";
import { calmHaptic, panicHaptic, softHaptic } from "../utils/haptics.js";
import Translator from "./Translator.jsx";
import BrainDump from "./BrainDump.jsx";
import CalmSounds from "./CalmSounds.jsx";
import ComfortCorner from "./ComfortCorner.jsx";

function Breathing({ lang, slow }) {
  const tx = (k) => t(k, lang);
  const [phase, setPhase] = useState("inhale");
  const cycle = slow ? [5000, 2000, 6000] : [4000, 1500, 4500];

  useEffect(() => {
    calmHaptic();
    const phases = ["inhale", "hold", "exhale"];
    let idx = 0;
    setPhase("inhale");
    let timer = setTimeout(function tick() {
      idx = (idx + 1) % 3;
      setPhase(phases[idx]);
      if (idx === 0) softHaptic();
      timer = setTimeout(tick, cycle[idx]);
    }, cycle[0]);
    return () => clearTimeout(timer);
  }, [slow]);

  return (
    <div className="mh-breathe">
      <div className={`mh-breathe__orb is-${phase} ${slow ? "is-slow" : ""}`} />
      <p className="mh-display mh-breathe__label">{tx(phase)}</p>
    </div>
  );
}

function Grounding({ lang }) {
  const tx = (k) => t(k, lang);
  const steps = [
    { key: "see5", n: 5 },
    { key: "touch4", n: 4 },
    { key: "hear3", n: 3 },
    { key: "smell2", n: 2 },
    { key: "taste1", n: 1 },
  ];
  const [step, setStep] = useState(0);
  const [tapped, setTapped] = useState(0);
  const cur = steps[step];

  function tap() {
    softHaptic();
    const next = tapped + 1;
    if (next >= cur.n) {
      if (step < steps.length - 1) {
        setStep(step + 1);
        setTapped(0);
      } else {
        setTapped(cur.n);
      }
    } else setTapped(next);
  }

  return (
    <div className="mh-ground">
      <p className="mh-panel__sub">{tx("groundSub")}</p>
      <h3 className="mh-display">{tx(cur.key)}</h3>
      <div className="mh-ground__dots">
        {Array.from({ length: cur.n }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`mh-ground__dot ${i < tapped ? "is-on" : ""}`}
            onClick={tap}
          />
        ))}
      </div>
      <p className="mh-muted">
        {tapped}/{cur.n}
      </p>
    </div>
  );
}

function SelfCare({ lang }) {
  const tx = (k) => t(k, lang);
  const [i, setI] = useState(() => Math.floor(Math.random() * SELF_CARE.length));
  const item = SELF_CARE[i];
  return (
    <div className="mh-selfcare">
      <p className="mh-panel__sub">{tx("selfCareSub")}</p>
      <p className="mh-display mh-selfcare__task">{lang === "ku" ? item.ku : item.en}</p>
      <button
        type="button"
        className="mh-ghost-cta"
        onClick={() => {
          softHaptic();
          setI((x) => (x + 1) % SELF_CARE.length);
        }}
      >
        {tx("anotherCare")}
      </button>
    </div>
  );
}

function Panic({ lang, onExit }) {
  const tx = (k) => t(k, lang);
  const [mode, setMode] = useState("hero");
  useEffect(() => {
    panicHaptic();
  }, []);

  return (
    <div className="mh-panic mh-panic--premium">
      <div className="mh-panic__glow" aria-hidden="true" />
      <h2 className="mh-display mh-panic__title">{tx("panic")}</h2>
      <p className="mh-panic__hero">{tx("panicHero")}</p>
      <p className="mh-panic__sub">{tx("panicHeroSub")}</p>

      {mode === "hero" && (
        <button
          type="button"
          className="mh-panic__calm-btn"
          onClick={() => {
            softHaptic();
            setMode("breathe");
          }}
        >
          <span className="mh-panic__calm-ring" aria-hidden="true" />
          <span>{tx("panicCalmBtn")}</span>
        </button>
      )}

      {(mode === "breathe" || mode === "ground") && (
        <div className="mh-panic__stage">
          {mode === "breathe" ? <Breathing lang={lang} slow /> : <Grounding lang={lang} />}
          <div className="mh-panic__switch">
            <button
              type="button"
              className={`mh-pill ${mode === "breathe" ? "mh-pill--accent" : ""}`}
              onClick={() => setMode("breathe")}
            >
              {tx("breathe")}
            </button>
            <button
              type="button"
              className={`mh-pill ${mode === "ground" ? "mh-pill--accent" : ""}`}
              onClick={() => setMode("ground")}
            >
              {tx("grounding")}
            </button>
          </div>
        </div>
      )}

      <div className="mh-panic__steps glass">
        <h3 className="mh-dash__section-title">{tx("panicStepsTitle")}</h3>
        <ol>
          <li>{tx("panicStep1")}</li>
          <li>{tx("panicStep2")}</li>
          <li>{tx("panicStep3")}</li>
          <li>{tx("panicStep4")}</li>
        </ol>
      </div>

      <p className="mh-muted mh-panic__note">
        {lang === "ku"
          ? "ئەگەر هەست بە مەترسی دەکەیت، یارمەتی لە کەسێکی نزیک یان فریاگوزاری ناوخۆیی بخوازە."
          : "If you feel unsafe, reach for someone nearby or local emergency support."}
      </p>
      <button type="button" className="mh-big-cta" onClick={onExit}>
        {tx("panicExit")}
      </button>
    </div>
  );
}

const TOOL_LIST = [
  { id: "breathe", labelKey: "breathe", subKey: "breatheSub" },
  { id: "grounding", labelKey: "grounding", subKey: "groundSub" },
  { id: "sounds", labelKey: "sounds", subKey: "soundsSub" },
  { id: "translator", labelKey: "translator", subKey: "translatorSub" },
  { id: "dump", labelKey: "dump", subKey: "dumpPh" },
  { id: "panic", labelKey: "panic", subKey: "panicSub" },
  { id: "comfort", labelKey: "comfort", subKey: "comfortSub" },
  { id: "selfCare", labelKey: "selfCare", subKey: "selfCareSub" },
];

export default function Tools({ lang, initialTool, onClearInitial }) {
  const tx = (k) => t(k, lang);
  const [tool, setTool] = useState(initialTool || null);

  useEffect(() => {
    if (initialTool) {
      setTool(initialTool);
      onClearInitial?.();
    }
  }, [initialTool]);

  if (tool === "translator") return <Translator lang={lang} />;
  if (tool === "dump") return <BrainDump lang={lang} />;
  if (tool === "panic") return <Panic lang={lang} onExit={() => setTool(null)} />;
  if (tool === "sounds") return <CalmSounds lang={lang} onBack={() => setTool(null)} />;
  if (tool === "comfort") return <ComfortCorner lang={lang} onBack={() => setTool(null)} />;

  if (tool) {
    return (
      <section className="mh-panel">
        <button type="button" className="mh-text-link" onClick={() => setTool(null)}>
          ← {tx("tools")}
        </button>
        <h2 className="mh-display mh-panel__title">{tx(TOOL_LIST.find((x) => x.id === tool)?.labelKey || tool)}</h2>
        {tool === "breathe" && <Breathing lang={lang} />}
        {tool === "grounding" && <Grounding lang={lang} />}
        {tool === "selfCare" && <SelfCare lang={lang} />}
        {tool === "reframer" && <Translator lang={lang} />}
      </section>
    );
  }

  return (
    <section className="mh-panel">
      <h2 className="mh-display mh-panel__title">{tx("toolsTitle")}</h2>
      <div className="mh-tool-grid">
        {TOOL_LIST.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`mh-tool-card ${item.id === "panic" ? "is-panic" : ""}`}
            onClick={() => {
              softHaptic();
              setTool(item.id);
            }}
          >
            <span className="mh-tool-card__title">{tx(item.labelKey)}</span>
            <span className="mh-tool-card__sub">{tx(item.subKey)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
