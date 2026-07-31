import { useState } from "react";
import { Music, Play, Pause } from "lucide-react";

const TRACKS = [
  { id: "calm", labelEn: "Calm Flow", labelKu: "ئارام", mood: "calm" },
  { id: "energy", labelEn: "Energy Boost", labelKu: "وزە", mood: "energy" },
  { id: "focus", labelEn: "Focus Mode", labelKu: "تەرکیز", mood: "focus" },
];

export default function MusicCard({ t, lang, onPlaySound }) {
  const [playing, setPlaying] = useState(null);

  const toggle = (id) => {
    onPlaySound?.();
    setPlaying((p) => (p === id ? null : id));
  };

  return (
    <section className="ft-music glass" id="fitness-music">
      <div className="ft-music__icon" aria-hidden="true">
        <Music size={22} strokeWidth={1.75} />
      </div>
      <div className="ft-music__body">
        <h2 className="ft-panel__title">{t("musicTitle")}</h2>
        <p className="ft-panel__desc">{t("musicSub")}</p>
        <div className="ft-music__tracks">
          {TRACKS.map((track) => {
            const isOn = playing === track.id;
            const label = lang === "ku" ? track.labelKu : track.labelEn;
            return (
              <button
                key={track.id}
                type="button"
                className={`ft-music__track ${isOn ? "is-playing" : ""}`}
                onClick={() => toggle(track.id)}
              >
                <span className="ft-music__track-art" data-mood={track.mood} />
                <span className="ft-music__track-label">{label}</span>
                <span className="ft-music__track-btn">
                  {isOn ? <Pause size={14} /> : <Play size={14} />}
                </span>
              </button>
            );
          })}
        </div>
        {playing && (
          <p className="ft-music__now">
            {t("musicNow")}: {lang === "ku" ? TRACKS.find((x) => x.id === playing)?.labelKu : TRACKS.find((x) => x.id === playing)?.labelEn}
          </p>
        )}
      </div>
    </section>
  );
}
