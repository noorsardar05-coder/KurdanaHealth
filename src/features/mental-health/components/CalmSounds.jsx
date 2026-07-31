import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Pause, Play, Repeat, Volume2, VolumeX } from "lucide-react";
import { t } from "../i18n/strings.js";
import { SOUNDSCAPES, formatElapsed } from "../data/soundscapes.js";
import { getAmbientEngine } from "../utils/ambientAudio.js";
import { softHaptic } from "../utils/haptics.js";

const FAV_KEY = "kh_mh_sound_favs";
const SESSION_LEN = 30 * 60; // visual session length for progress (loops forever)

function loadFavs() {
  try {
    const raw = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((id) => id !== "quran") : [];
  } catch {
    return [];
  }
}

function saveFavs(ids) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids.filter((id) => id !== "quran")));
}

export default function CalmSounds({ lang, onBack }) {
  const tx = (k) => t(k, lang);
  const engine = useMemo(() => getAmbientEngine(), []);
  const [activeId, setActiveId] = useState("rain");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(true);
  const [favs, setFavs] = useState(loadFavs);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(0);

  const active = SOUNDSCAPES.find((s) => s.id === activeId) || SOUNDSCAPES[0];
  const isFav = favs.includes(activeId);
  const quote = lang === "ku" ? active.quote.ku : active.quote.en;
  const [c0, c1] = active.hue;

  useEffect(() => {
    return () => {
      engine.stop();
      cancelAnimationFrame(rafRef.current);
    };
  }, [engine]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      softHaptic();
      setElapsed(0);
      startRef.current = performance.now();
      await engine.play(activeId);
      if (!cancelled) setPlaying(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start once on mount
  }, []);

  useEffect(() => {
    engine.setVolume(muted ? 0 : volume);
  }, [volume, muted, engine]);

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    if (!startRef.current) startRef.current = performance.now() - elapsed * 1000;
    const tick = (now) => {
      let sec = (now - startRef.current) / 1000;
      if (sec >= SESSION_LEN) {
        if (loop) {
          startRef.current = now;
          sec = 0;
        } else {
          engine.stop();
          setPlaying(false);
          setElapsed(SESSION_LEN);
          return;
        }
      }
      setElapsed(sec);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, loop, engine]);

  async function selectSound(id) {
    softHaptic();
    setActiveId(id);
    setElapsed(0);
    startRef.current = performance.now();
    await engine.play(id);
    setPlaying(true);
  }

  async function togglePlay() {
    softHaptic();
    if (playing) {
      engine.stop();
      setPlaying(false);
      startRef.current = null;
      return;
    }
    startRef.current = performance.now() - elapsed * 1000;
    await engine.play(activeId);
    setPlaying(true);
  }

  function toggleFav() {
    softHaptic();
    setFavs((prev) => {
      const next = prev.includes(activeId)
        ? prev.filter((x) => x !== activeId)
        : [...prev, activeId];
      saveFavs(next);
      return next;
    });
  }

  const progress = Math.min(1, elapsed / SESSION_LEN);

  return (
    <section className={`mh-calm mh-calm--${activeId}`} style={{ "--cs0": c0, "--cs1": c1 }}>
      <div className="mh-calm__bg" aria-hidden="true">
        <div className="mh-calm__wash" />
        <div className="mh-calm__orb mh-calm__orb--a" />
        <div className="mh-calm__orb mh-calm__orb--b" />
        <div className={`mh-calm__fx mh-calm__fx--${activeId}`} />
      </div>

      <header className="mh-calm__head">
        <button type="button" className="mh-text-link mh-calm__back" onClick={onBack}>
          ← {tx("tools")}
        </button>
        <div>
          <h2 className="mh-display mh-calm__title">{tx("sounds")}</h2>
          <p className="mh-calm__sub">{tx("soundsSub")}</p>
        </div>
      </header>

      <div className="mh-calm__stage">
        <div className={`mh-calm__cover sound-${activeId} ${playing ? "is-playing" : ""}`}>
          <div className="mh-calm__cover-art" aria-hidden="true" />
          <div className="mh-calm__cover-ring" aria-hidden="true" />
          <span className="mh-calm__cover-label">{tx(active.labelKey)}</span>
        </div>

        <p className="mh-calm__quote" key={activeId + quote}>
          {quote}
        </p>

        <div className="mh-calm__player glass">
          <div className="mh-calm__meta">
            <strong>{tx(active.labelKey)}</strong>
            <span>{formatElapsed(elapsed)} / ∞</span>
          </div>

          <div
            className="mh-calm__progress"
            role="slider"
            aria-valuemin={0}
            aria-valuemax={SESSION_LEN}
            aria-valuenow={Math.floor(elapsed)}
            aria-label={tx("sounds")}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              const next = ratio * SESSION_LEN;
              setElapsed(next);
              if (playing) startRef.current = performance.now() - next * 1000;
            }}
          >
            <div className="mh-calm__progress-fill" style={{ width: `${progress * 100}%` }} />
            <div className="mh-calm__progress-knob" style={{ insetInlineStart: `${progress * 100}%` }} />
          </div>

          <div className="mh-calm__controls">
            <button
              type="button"
              className={`mh-calm__icon-btn ${isFav ? "is-on" : ""}`}
              onClick={toggleFav}
              aria-label={tx("favorite")}
            >
              <Heart size={20} fill={isFav ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              className="mh-calm__play"
              onClick={togglePlay}
              aria-label={playing ? tx("pause") : tx("play")}
            >
              {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>

            <button
              type="button"
              className={`mh-calm__icon-btn ${loop ? "is-on" : ""}`}
              onClick={() => {
                softHaptic();
                setLoop((v) => !v);
              }}
              aria-label={tx("loop")}
            >
              <Repeat size={20} />
            </button>
          </div>

          <div className="mh-calm__volume">
            <button
              type="button"
              className="mh-calm__icon-btn"
              onClick={() => {
                softHaptic();
                setMuted((m) => !m);
              }}
              aria-label={muted ? tx("unmute") : tx("mute")}
            >
              {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setMuted(false);
                setVolume(Number(e.target.value));
              }}
              aria-label={tx("volume")}
            />
          </div>
        </div>
      </div>

      <div className="mh-calm__library">
        <p className="mh-dash__section-label">{tx("soundLibrary")}</p>
        <div className="mh-calm__grid">
          {SOUNDSCAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`mh-calm__card sound-${s.id} ${activeId === s.id ? "is-on" : ""} ${
                favs.includes(s.id) ? "is-fav" : ""
              }`}
              onClick={() => selectSound(s.id)}
            >
              <span className="mh-calm__card-art" aria-hidden="true" />
              <span className="mh-calm__card-body">
                <span className="mh-calm__card-title">{tx(s.labelKey)}</span>
                <span className="mh-calm__card-dur">∞</span>
              </span>
              {activeId === s.id && playing && <span className="mh-calm__eq" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
