import { useEffect, useState } from "react";
import { t } from "../i18n/strings.js";
import { softHaptic } from "../utils/haptics.js";
import { speakSoft } from "../utils/voice.js";
import {
  clearMirrorSaves,
  deleteMirrorSave,
  loadMirrorSaves,
  saveMirrorSaves,
} from "../utils/storage.js";
import { MIRROR_MODES, mirrorThought } from "../utils/thoughtMirror/engine.js";
import CompanionOrb from "./CompanionOrb.jsx";

const FOLLOW_UPS = [
  { id: "perspective", key: "mirrorAnotherPerspective", icon: "💡" },
  { id: "another", key: "mirrorReframeAgain", icon: "🔄" },
  { id: "challenge", key: "mirrorGiveChallenge", icon: "🌱" },
  { id: "kinder", key: "mirrorKinderVersion", icon: "❤️" },
  { id: "logical", key: "mirrorMoreLogical", icon: "🧠" },
];

export default function Translator({ lang }) {
  const tx = (k) => t(k, lang);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("idle");
  const [result, setResult] = useState(null);
  const [urgent, setUrgent] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [saves, setSaves] = useState(() => loadMirrorSaves());
  const [lastCategory, setLastCategory] = useState(null);
  const [lastPatternId, setLastPatternId] = useState(null);
  const [mirrorMode, setMirrorMode] = useState("coach");
  const [pendingVariant, setPendingVariant] = useState("");

  useEffect(() => {
    if (phase !== "reflecting") return undefined;
    const id = setTimeout(() => {
      const out = mirrorThought({
        text,
        lang,
        mirrorMode,
        variant: pendingVariant,
        category: pendingVariant ? lastCategory || undefined : undefined,
        avoidPatternId: pendingVariant === "another" ? lastPatternId : undefined,
      });
      setPendingVariant("");
      if (out.urgent) {
        setUrgent(true);
        setResult(null);
        setPhase("urgent");
        return;
      }
      setUrgent(false);
      setResult(out);
      setLastCategory(out.category);
      setLastPatternId(out.patternId || null);
      setPhase("done");
      const speak =
        out.mode === "short"
          ? out.short
          : `${out.challenge || out.reflect}. ${out.replace}`;
      speakSoft(speak, lang);
    }, 420 + Math.floor(Math.random() * 200));
    return () => clearTimeout(id);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  function run(variant = "") {
    if (!text.trim() || phase === "reflecting") return;
    softHaptic();
    setSavedMsg("");
    setUrgent(false);

    if (variant && result) {
      const out = mirrorThought({
        text,
        lang,
        mirrorMode,
        variant,
        category: lastCategory || undefined,
        avoidPatternId: variant === "another" ? lastPatternId : undefined,
      });
      if (out.urgent) {
        setUrgent(true);
        setResult(null);
        setPhase("urgent");
        return;
      }
      setResult(out);
      setLastCategory(out.category);
      setLastPatternId(out.patternId || null);
      setPhase("done");
      speakSoft(out.mode === "short" ? out.short : `${out.challenge || ""}. ${out.replace}`, lang);
      return;
    }

    setPendingVariant(variant || "");
    setResult(null);
    setPhase("reflecting");
  }

  function switchMode(id) {
    softHaptic();
    setMirrorMode(id);
    if (text.trim() && result && !urgent) {
      const out = mirrorThought({
        text,
        lang,
        mirrorMode: id,
        variant: "",
        category: lastCategory || undefined,
      });
      if (!out.urgent) {
        setResult(out);
        setLastPatternId(out.patternId || null);
      }
    }
  }

  function clearCurrent() {
    setText("");
    setResult(null);
    setUrgent(false);
    setSavedMsg("");
    setPhase("idle");
    setLastCategory(null);
    setLastPatternId(null);
  }

  function saveThought() {
    if (!result || result.urgent) return;
    softHaptic();
    const entry = {
      id: `mirror_${Date.now()}`,
      at: Date.now(),
      thought: text.trim(),
      reflect: result.reflect,
      challenge: result.challenge,
      replace: result.replace,
      action: result.action,
      kinder: result.replace,
      category: result.category,
      mirrorMode,
      lang,
    };
    const next = [entry, ...loadMirrorSaves()].slice(0, 40);
    saveMirrorSaves(next);
    setSaves(next);
    setSavedMsg(tx("mirrorSaved"));
  }

  function removeSave(id) {
    softHaptic();
    setSaves(deleteMirrorSave(id));
  }

  function removeAllSaves() {
    softHaptic();
    clearMirrorSaves();
    setSaves([]);
  }

  return (
    <section className={`mh-panel mh-mirror ${lang === "ku" ? "is-ku" : ""}`}>
      <div className="mh-mirror__hero">
        <CompanionOrb size="md" mood="okay" speaking={phase === "reflecting"} />
        <h2 className="mh-display mh-panel__title">{tx("translator")}</h2>
        <p className="mh-panel__sub">{tx("translatorSub")}</p>
        <p className="mh-privacy-line">{tx("mirrorPrivateDevice")}</p>
      </div>

      <div className="mh-mode-row" role="tablist" aria-label={tx("mirrorModes")}>
        {MIRROR_MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mirrorMode === m.id}
            className={`mh-mode-chip ${mirrorMode === m.id ? "is-on" : ""}`}
            onClick={() => switchMode(m.id)}
          >
            <span aria-hidden="true">{m.icon}</span>
            {lang === "ku" ? m.label.ku : m.label.en}
          </button>
        ))}
      </div>

      <textarea
        className="mh-textarea mh-mirror__input"
        rows={4}
        placeholder={tx("translatorPh")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        dir={lang === "ku" ? "rtl" : "ltr"}
      />

      <div className="mh-mirror-primary">
        <button
          type="button"
          className="mh-big-cta"
          onClick={() => run()}
          disabled={!text.trim() || phase === "reflecting"}
        >
          {phase === "reflecting" ? tx("reflecting") : tx("translate")}
        </button>
        <button type="button" className="mh-ghost-cta" onClick={clearCurrent}>
          {tx("mirrorClear")}
        </button>
      </div>

      {phase === "reflecting" && (
        <div className="mh-listen">
          <CompanionOrb size="md" speaking mood="unknown" />
          <p>{tx("reflecting")}</p>
        </div>
      )}

      {(urgent || phase === "urgent") && (
        <div className="mh-urgent" role="alert">
          <h3 className="mh-display">{tx("mirrorUrgentTitle")}</h3>
          <p>{tx("mirrorUrgentBody")}</p>
          <p className="mh-muted">{tx("mirrorUrgentNote")}</p>
          <button type="button" className="mh-big-cta" onClick={clearCurrent}>
            {tx("mirrorUrgentBack")}
          </button>
        </div>
      )}

      {result && phase === "done" && !urgent && (
        <div className="mh-reframe">
          {result.mode === "short" ? (
            <div className="mh-reframe__card mh-reframe__card--soft">
              <p className="mh-display mh-reframe__kinder">{result.short}</p>
            </div>
          ) : (
            <>
              {result.reflect ? (
                <div className="mh-reframe__card">
                  <span className="mh-reframe__label">{tx("mirrorReflectLabel")}</span>
                  <p>{result.reflect}</p>
                </div>
              ) : null}
              {result.challenge ? (
                <div className="mh-reframe__card mh-reframe__card--challenge">
                  <span className="mh-reframe__label">{tx("mirrorChallengeLabel")}</span>
                  <p>{result.challenge}</p>
                </div>
              ) : null}
              {result.perspective ? (
                <div className="mh-reframe__card">
                  <span className="mh-reframe__label">{tx("mirrorPerspectiveLabel")}</span>
                  <p>{result.perspective}</p>
                </div>
              ) : null}
              {result.replace ? (
                <div className="mh-reframe__card mh-reframe__card--soft">
                  <span className="mh-reframe__label">{tx("mirrorReplaceLabel")}</span>
                  <p className="mh-display mh-reframe__kinder">“{result.replace}”</p>
                </div>
              ) : null}
              {result.action ? (
                <div className="mh-reframe__card">
                  <span className="mh-reframe__label">{tx("mirrorActionLabel")}</span>
                  <p>{result.action}</p>
                </div>
              ) : null}
            </>
          )}

          <div className="mh-mirror-actions" role="group" aria-label={tx("translator")}>
            {FOLLOW_UPS.map((a) => (
              <button
                key={a.id}
                type="button"
                className="mh-chip"
                disabled={phase === "reflecting"}
                onClick={() => run(a.id)}
              >
                <span aria-hidden="true">{a.icon}</span> {tx(a.key)}
              </button>
            ))}
            <button type="button" className="mh-chip mh-chip--accent" onClick={saveThought}>
              {tx("mirrorSave")}
            </button>
            <button type="button" className="mh-chip" onClick={clearCurrent}>
              {tx("mirrorClear")}
            </button>
          </div>
          {savedMsg ? <p className="mh-muted">{savedMsg}</p> : null}
        </div>
      )}

      {saves.length > 0 && (
        <div className="mh-mirror-saves">
          <div className="mh-mirror-saves__head">
            <h3>{tx("mirrorSavedTitle")}</h3>
            <button type="button" className="mh-text-link" onClick={removeAllSaves}>
              {tx("mirrorDeleteAll")}
            </button>
          </div>
          <ul className="mh-mirror-saves__list">
            {saves.slice(0, 8).map((s) => (
              <li key={s.id}>
                <p className="mh-mirror-saves__thought">{s.thought}</p>
                <p className="mh-muted">{s.replace || s.kinder}</p>
                <button type="button" className="mh-text-link" onClick={() => removeSave(s.id)}>
                  {tx("mirrorDeleteOne")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
