export default function ProgressBar({ value, className }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={`wp-progress ${className || ""}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="wp-progress__track">
        <div className="wp-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
