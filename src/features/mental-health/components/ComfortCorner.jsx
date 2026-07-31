import { useEffect, useMemo, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { t } from "../i18n/strings.js";
import { COMFORT_SCENES } from "../data/soundscapes.js";
import { getAmbientEngine } from "../utils/ambientAudio.js";
import { softHaptic } from "../utils/haptics.js";

export default function ComfortCorner({ lang, onBack }) {
  const tx = (k) => t(k, lang);
  const engine = useMemo(() => getAmbientEngine(), []);
  const [sceneId, setSceneId] = useState("clouds");
  const [soundOn, setSoundOn] = useState(true);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [entering, setEntering] = useState(true);

  const scene = COMFORT_SCENES.find((s) => s.id === sceneId) || COMFORT_SCENES[0];
  const quote = scene.quotes[quoteIdx % scene.quotes.length];
  const quoteText = lang === "ku" ? quote.ku : quote.en;

  useEffect(() => {
    setEntering(true);
    const tmr = setTimeout(() => setEntering(false), 480);
    return () => clearTimeout(tmr);
  }, [sceneId]);

  useEffect(() => {
    setQuoteIdx(0);
    const id = setInterval(() => setQuoteIdx((i) => i + 1), 9000);
    return () => clearInterval(id);
  }, [sceneId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!soundOn) {
        engine.stop();
        return;
      }
      await engine.play(scene.soundId);
      if (cancelled) engine.stop();
    })();
    return () => {
      cancelled = true;
    };
  }, [sceneId, soundOn, engine, scene.soundId]);

  useEffect(() => () => engine.stop(), [engine]);

  function pickScene(id) {
    softHaptic();
    setSceneId(id);
  }

  return (
    <section className={`mh-haven mh-haven--${sceneId} ${entering ? "is-entering" : ""}`}>
      <div className="mh-haven__world" aria-hidden="true">
        {sceneId === "rain" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--rain" />
            <div className="mh-haven__rain">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} style={{ "--i": i, "--d": `${(i % 7) * 0.18}s`, "--x": `${(i * 3.7) % 100}%` }} />
              ))}
            </div>
            <div className="mh-haven__window" />
          </>
        )}

        {sceneId === "clouds" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--clouds" />
            <div className="mh-haven__cloud mh-haven__cloud--1" />
            <div className="mh-haven__cloud mh-haven__cloud--2" />
            <div className="mh-haven__cloud mh-haven__cloud--3" />
            <div className="mh-haven__sun" />
          </>
        )}

        {sceneId === "fireplace" && (
          <>
            <div className="mh-haven__room" />
            <div className="mh-haven__mantel" />
            <div className="mh-haven__fire">
              <span className="mh-haven__flame mh-haven__flame--a" />
              <span className="mh-haven__flame mh-haven__flame--b" />
              <span className="mh-haven__flame mh-haven__flame--c" />
              <span className="mh-haven__ember" />
            </div>
            <div className="mh-haven__glow" />
          </>
        )}

        {sceneId === "ocean" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--ocean" />
            <div className="mh-haven__horizon" />
            <div className="mh-haven__wave mh-haven__wave--1" />
            <div className="mh-haven__wave mh-haven__wave--2" />
            <div className="mh-haven__wave mh-haven__wave--3" />
            <div className="mh-haven__foam" />
          </>
        )}

        {sceneId === "cats" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--cats" />
            <div className="mh-haven__cushion" />
            <div className="mh-haven__cat">
              <span className="mh-haven__cat-body" />
              <span className="mh-haven__cat-head" />
              <span className="mh-haven__cat-ear mh-haven__cat-ear--l" />
              <span className="mh-haven__cat-ear mh-haven__cat-ear--r" />
              <span className="mh-haven__cat-tail" />
            </div>
            <div className="mh-haven__yarn" />
          </>
        )}

        {sceneId === "dogs" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--dogs" />
            <div className="mh-haven__rug" />
            <div className="mh-haven__dog">
              <span className="mh-haven__dog-body" />
              <span className="mh-haven__dog-head" />
              <span className="mh-haven__dog-ear mh-haven__dog-ear--l" />
              <span className="mh-haven__dog-ear mh-haven__dog-ear--r" />
              <span className="mh-haven__dog-snout" />
            </div>
            <div className="mh-haven__ball" />
          </>
        )}

        {sceneId === "capybara" && (
          <>
            <div className="mh-haven__sky mh-haven__sky--capy" />
            <div className="mh-haven__pond" />
            <div className="mh-haven__lily mh-haven__lily--1" />
            <div className="mh-haven__lily mh-haven__lily--2" />
            <div className="mh-haven__capy">
              <span className="mh-haven__capy-body" />
              <span className="mh-haven__capy-head" />
              <span className="mh-haven__capy-nose" />
            </div>
            <div className="mh-haven__ripple" />
          </>
        )}
      </div>

      <header className="mh-haven__head">
        <button type="button" className="mh-text-link mh-haven__back" onClick={onBack}>
          ← {tx("tools")}
        </button>
        <button
          type="button"
          className={`mh-haven__sound-toggle ${soundOn ? "is-on" : ""}`}
          onClick={() => {
            softHaptic();
            setSoundOn((v) => !v);
          }}
          aria-label={soundOn ? tx("mute") : tx("unmute")}
        >
          {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          <span>{soundOn ? tx("ambientOn") : tx("ambientOff")}</span>
        </button>
      </header>

      <div className="mh-haven__content">
        <p className="mh-haven__eyebrow">{tx("comfort")}</p>
        <h2 className="mh-display mh-haven__title">{tx(scene.labelKey)}</h2>
        <p className="mh-haven__quote" key={`${sceneId}-${quoteIdx}`}>
          {quoteText}
        </p>
        <p className="mh-haven__hint">{tx("comfortHint")}</p>
      </div>

      <nav className="mh-haven__picks" aria-label={tx("comfort")}>
        {COMFORT_SCENES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`mh-haven__pick mh-haven__pick--${s.id} ${sceneId === s.id ? "is-on" : ""}`}
            onClick={() => pickScene(s.id)}
          >
            <span className="mh-haven__pick-dot" aria-hidden="true" />
            <span>{tx(s.labelKey)}</span>
          </button>
        ))}
      </nav>
    </section>
  );
}
