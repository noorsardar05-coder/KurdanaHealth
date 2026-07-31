import { useMemo, useState } from "react";
import { challengeForToday } from "../data/challenges.js";
import { HEALTH_MYTHS } from "../data/myths.js";
import { SIMULATIONS } from "../data/simulations.js";
import { TIMELINE } from "../data/timeline.js";
import { ORGANS, ORGAN_ORDER } from "../data/organs.js";

const ZONES = [
  { id: "head", label: "Head", organs: ["brain"] },
  { id: "chest", label: "Chest", organs: ["heart", "lungs"] },
  { id: "abdomen", label: "Abdomen", organs: ["liver", "stomach", "pancreas", "spleen", "kidneys", "intestines", "appendix", "gallbladder"] },
  { id: "pelvis", label: "Pelvis", organs: ["bladder"] },
  { id: "spine", label: "Spine", organs: ["spinalCord"] },
];

function Scanner({ onOpenOrgan }) {
  const [zone, setZone] = useState(null);
  const active = ZONES.find((z) => z.id === zone);

  return (
    <section>
      <h2 className="bw-display">Body regions</h2>
      <p className="bw-panel__lead">Open atlas organs by anatomical region. Educational only.</p>
      <p className="bw-disclaimer">This is educational information and not a diagnosis.</p>
      <div className="bw-game__choices">
        {ZONES.map((z) => (
          <button
            key={z.id}
            type="button"
            className={`bw-chip ${zone === z.id ? "is-on" : ""}`}
            onClick={() => setZone(z.id)}
          >
            {z.label}
          </button>
        ))}
      </div>
      {active && (
        <div className="bw-grid" style={{ marginTop: "1rem" }}>
          <p className="bw-tile__sub">Structures in the {active.label.toLowerCase()}:</p>
          {active.organs.map((id) => {
            const o = ORGANS[id];
            if (!o) return null;
            return (
              <button key={id} type="button" className="bw-tile" onClick={() => onOpenOrgan(id)}>
                <p className="bw-tile__title">{o.name}</p>
                <p className="bw-tile__sub">{o.location}</p>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Myths() {
  const [i, setI] = useState(0);
  const m = HEALTH_MYTHS[i];
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="bw-display">Health Myths</h2>
      <p className="bw-panel__lead">Swipe the truth — one myth at a time.</p>
      <button
        type="button"
        className="bw-tile"
        onClick={() => setI((v) => (v + 1) % HEALTH_MYTHS.length)}
        style={{ minHeight: 160 }}
      >
        <span className="bw-tile__emoji">❌</span>
        <p className="bw-tile__title">“{m.claim}”</p>
        <p className="bw-tile__sub" style={{ color: "#ff8a98", marginTop: 8 }}>
          FALSE
        </p>
        <p className="bw-tile__sub" style={{ marginTop: 8, color: "rgba(244,241,234,0.85)" }}>
          {m.truth}
        </p>
        <p className="bw-tile__sub" style={{ marginTop: 12 }}>
          Tap for next →
        </p>
      </button>
    </section>
  );
}

function Sims() {
  const [active, setActive] = useState(null);
  const sim = SIMULATIONS.find((s) => s.id === active);
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="bw-display">What happens if…</h2>
      <p className="bw-panel__lead">Watch the body react — visually, simply.</p>
      <div className="bw-grid">
        {SIMULATIONS.map((s) => (
          <button key={s.id} type="button" className="bw-tile" onClick={() => setActive(s.id)}>
            <span className="bw-tile__emoji">{s.emoji}</span>
            <p className="bw-tile__title">{s.title}</p>
          </button>
        ))}
      </div>
      {sim && (
        <div className="bw-tile" style={{ marginTop: "0.75rem" }}>
          <p className="bw-tile__title">
            {sim.emoji} {sim.title}
          </p>
          <div className="bw-sim-body">
            {sim.effects.map((e) => (
              <span
                key={e.organ}
                className="bw-sim-pill"
                style={{
                  borderColor: `color-mix(in srgb, #ff6b7a ${e.level * 100}%, transparent)`,
                  background: `color-mix(in srgb, #ff6b7a ${e.level * 28}%, transparent)`,
                }}
              >
                {e.organ}: {e.note}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Timeline() {
  const [id, setId] = useState("adult");
  const step = TIMELINE.find((t) => t.id === id) || TIMELINE[3];
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="bw-display">Body Timeline</h2>
      <p className="bw-panel__lead">Watch organs change through life.</p>
      <div className="bw-timeline">
        {TIMELINE.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`bw-timeline__step ${id === t.id ? "is-on" : ""}`}
            onClick={() => setId(t.id)}
          >
            <div className="bw-timeline__rail" />
            <div>
              <p className="bw-tile__title">
                {t.label} <span className="bw-timeline__age">{t.age}</span>
              </p>
              {id === t.id && (
                <>
                  <p className="bw-tile__sub">{t.note}</p>
                  <div className="bw-sim-body">
                    {t.highlights.map((h) => (
                      <span key={h.organ} className="bw-sim-pill">
                        {h.organ}: {h.text}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
      <p className="bw-tile__sub" style={{ marginTop: 4 }}>
        ↓ {step.label}
      </p>
    </section>
  );
}

function Challenge({ onOpenOrgan, progress }) {
  const challenge = useMemo(() => challengeForToday(), []);
  const [guess, setGuess] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const organ = ORGANS[challenge.organId];

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="bw-display">Body Challenge</h2>
      <p className="bw-panel__lead">One challenge. Every day.</p>
      <div className="bw-tile">
        <p className="bw-tile__title">{challenge.prompt}</p>
        {challenge.choices ? (
          <div className="bw-sim-body">
            {challenge.choices.map((c) => (
              <button
                key={c}
                type="button"
                className="bw-chip"
                onClick={() => {
                  setGuess(c);
                  setRevealed(true);
                }}
              >
                {c}
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            className="bw-play-btn"
            style={{ marginTop: 12 }}
            onClick={() => {
              setRevealed(true);
              onOpenOrgan(challenge.organId);
              progress?.();
            }}
          >
            Find it on the body
          </button>
        )}
        {revealed && (
          <p className="bw-tile__sub" style={{ marginTop: 12 }}>
            {challenge.choices
              ? guess === challenge.answer
                ? `Correct — ${challenge.hint}`
                : `It’s ${challenge.answer}. ${challenge.hint}`
              : challenge.hint}
          </p>
        )}
      </div>
    </section>
  );
}

function Collectibles({ unlocked, onOpenOrgan }) {
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2 className="bw-display">Collectibles</h2>
      <p className="bw-panel__lead">Premium organ cards — unlocked by exploring.</p>
      <div className="bw-collect">
        {ORGAN_ORDER.map((id) => {
          const o = ORGANS[id];
          const open = unlocked.includes(id);
          return (
            <button
              key={id}
              type="button"
              className={`bw-collect__card ${open ? "" : "is-locked"}`}
              onClick={() => open && onOpenOrgan(id)}
              style={{ borderColor: open ? o.accent : undefined }}
            >
              <span className="bw-collect__swatch" style={{ background: open ? o.accent : "transparent" }} />
              <p className="bw-collect__name">{open ? o.collectible : "Locked"}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function ExplorePanel({ unlocked, onOpenOrgan, onChallengeProgress }) {
  return (
    <div className="bw-panel">
      <Scanner onOpenOrgan={onOpenOrgan} />
      <Challenge onOpenOrgan={onOpenOrgan} progress={onChallengeProgress} />
      <Myths />
      <Sims />
      <Timeline />
      <Collectibles unlocked={unlocked} onOpenOrgan={onOpenOrgan} />
    </div>
  );
}
