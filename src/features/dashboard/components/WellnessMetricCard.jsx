import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Heart,
  Moon,
  Smile,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
  wellness: Heart,
  sleep: Moon,
  hydration: Droplets,
  mood: Smile,
  activity: Activity,
};

function clampPct(n, fallback = 65) {
  const v = typeof n === "number" ? n : fallback;
  return Math.min(100, Math.max(0, Math.round(v)));
}

function moodStatusKey(mood) {
  if (mood >= 80) return "moodCalm";
  if (mood >= 65) return "moodGood";
  return "moodLow";
}

export default function WellnessMetricCard({ metric, snapshot, td, index }) {
  const Icon = ICONS[metric.icon] ?? Heart;
  const value = snapshot[metric.valueKey];
  const pct = clampPct(snapshot[metric.progressKey]);
  const unit = metric.unit ?? (metric.unitKey ? td(metric.unitKey) : "");
  const sub =
    metric.statusFn === "mood"
      ? td(moodStatusKey(snapshot.mood ?? 78))
      : td(metric.subKey);

  return (
    <motion.article
      className="kh-wellness-card"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: EASE }}
    >
      <div className="kh-wellness-card__head">
        <span className="kh-wellness-card__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <span className="kh-wellness-card__label">{td(metric.labelKey)}</span>
      </div>

      <div className="kh-wellness-card__value-row">
        <span className="kh-wellness-card__value">{value}</span>
        {unit && <span className="kh-wellness-card__unit">{unit}</span>}
      </div>

      <div className="kh-wellness-card__track" role="presentation">
        <motion.span
          className="kh-wellness-card__track-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        />
      </div>

      <p className="kh-wellness-card__sub">{sub}</p>
    </motion.article>
  );
}
