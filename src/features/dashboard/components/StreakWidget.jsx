import { motion } from "framer-motion";
import { toEasternDigits } from "../i18n/dashboardStrings.js";

const EASE = [0.22, 1, 0.36, 1];

export default function StreakWidget({
  current,
  longest,
  title,
  unitLabel,
  unitSingular,
  usedText,
  encourage,
  longestText,
  lang,
}) {
  const days = current || 0;
  const best = Math.max(longest || 0, days);
  const displayDays = lang === "ku" ? toEasternDigits(days) : days;
  const unit = days === 1 ? unitSingular : unitLabel;
  const progress = Math.min(100, Math.max(12, (days / Math.max(best, 7)) * 100));

  return (
    <motion.section
      className="kh-streak"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
    >
      <div className="kh-streak__card">
        <p className="kh-streak__label">{title}</p>
        <div className="kh-streak__row">
          <span className="kh-streak__flame" aria-hidden="true">
            🔥
          </span>
          <span className="kh-streak__num">{displayDays}</span>
          <span className="kh-streak__unit">{unit}</span>
        </div>
        <p className="kh-streak__used">{usedText}</p>
        <p className="kh-streak__encourage">{encourage}</p>
        <div className="kh-streak__track" aria-hidden="true">
          <motion.span
            className="kh-streak__fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
        </div>
        <p className="kh-streak__longest">{longestText}</p>
      </div>
    </motion.section>
  );
}
