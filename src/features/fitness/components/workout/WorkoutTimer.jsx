export function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function WorkoutTimer({ seconds, label, size = "lg", accent }) {
  return (
    <div className={`wp-timer wp-timer--${size}${accent ? ` wp-timer--${accent}` : ""}`}>
      {label && <span className="wp-timer__label">{label}</span>}
      <span className="wp-timer__value">{formatTimer(seconds)}</span>
    </div>
  );
}

export function CountdownRing({ seconds, total, children, size = "md", paused }) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const pct = total ? (total - seconds) / total : 0;
  const offset = c - pct * c;

  return (
    <div className={`wp-ring wp-ring--${size}${paused ? " wp-ring--paused" : ""}`}>
      <svg viewBox="0 0 128 128" className="wp-ring__svg" aria-hidden="true">
        <circle cx="64" cy="64" r={r} className="wp-ring__bg" />
        <circle cx="64" cy="64" r={r} className="wp-ring__track-glow" strokeDasharray={c} />
        <circle
          cx="64"
          cy="64"
          r={r}
          className="wp-ring__fill"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="wp-ring__inner">{children ?? seconds}</div>
    </div>
  );
}
