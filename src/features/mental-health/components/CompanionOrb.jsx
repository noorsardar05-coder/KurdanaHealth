import { useEffect, useState } from "react";

/** Living companion — blink, breathe, occasional glance/wave. */
export default function CompanionOrb({ size = "md", mood, speaking, onClick }) {
  const [blink, setBlink] = useState(false);
  const [wave, setWave] = useState(false);
  const [glance, setGlance] = useState(0);

  useEffect(() => {
    const blinkId = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200 + Math.random() * 2400);
    return () => clearInterval(blinkId);
  }, []);

  useEffect(() => {
    const waveId = setInterval(() => {
      setWave(true);
      setTimeout(() => setWave(false), 900);
    }, 14000 + Math.random() * 8000);
    return () => clearInterval(waveId);
  }, []);

  useEffect(() => {
    const glanceId = setInterval(() => {
      setGlance((g) => (g === 0 ? (Math.random() > 0.5 ? 1 : -1) : 0));
    }, 5000);
    return () => clearInterval(glanceId);
  }, []);

  return (
    <button
      type="button"
      className={`mh-orb mh-orb--${size} ${speaking ? "is-speaking" : ""} ${wave ? "is-wave" : ""} mood-${mood || "unknown"}`}
      onClick={onClick}
      aria-label="Kurdana companion"
    >
      <span className="mh-orb__glow" aria-hidden="true" />
      <span className="mh-orb__face" style={{ transform: `translateX(${glance * 3}px)` }} aria-hidden="true">
        <span className={`mh-orb__eye ${blink ? "is-blink" : ""}`} />
        <span className={`mh-orb__eye ${blink ? "is-blink" : ""}`} />
        <span className="mh-orb__smile" />
      </span>
    </button>
  );
}
