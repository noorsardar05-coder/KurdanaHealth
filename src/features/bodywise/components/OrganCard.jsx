import { motion } from "framer-motion";
import { organProgress } from "../data/organs.js";
import { s } from "../data/ui.js";

export default function OrganCard({ organ, lang, state, onOpen, index = 0 }) {
  const prog = organProgress(state, organ.id);
  return (
    <motion.button
      type="button"
      className="bw-organ-card"
      style={{
        "--oc": organ.color,
        "--og": organ.glow,
      }}
      onClick={() => onOpen(organ.id)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="bw-organ-card-glow" aria-hidden="true" />
      <span className="bw-organ-icon">{organ.icon}</span>
      <span className="bw-organ-name">{organ.name[lang]}</span>
      <span className="bw-organ-sub">{organ.subtitle[lang]}</span>
      <span className="bw-organ-bar" aria-hidden="true">
        <span style={{ width: `${prog.pct}%` }} />
      </span>
      <span className="bw-organ-meta">
        {prog.isComplete ? (
          <span className="bw-badge-done">✓ {s(lang, "completed")}</span>
        ) : (
          <span>
            {prog.completed}/{prog.total}
          </span>
        )}
      </span>
    </motion.button>
  );
}
