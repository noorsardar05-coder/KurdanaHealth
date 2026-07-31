import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { s } from "../data/ui.js";

export default function EntryGate({ lang, onEnter }) {
  return (
    <motion.div
      className="bw-gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45 }}
    >
      <div className="bw-gate-glow" aria-hidden="true" />
      <motion.div
        className="bw-gate-card"
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120, damping: 18 }}
      >
        <motion.span
          className="bw-gate-icon"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          🫀
        </motion.span>
        <h1 className="bw-display">{s(lang, "brand")}</h1>
        <p className="bw-gate-tag">{s(lang, "tagline")}</p>
        <p className="bw-gate-welcome">{s(lang, "welcome")}</p>
        <button type="button" className="bw-btn bw-btn-primary" onClick={onEnter}>
          <Sparkles size={18} />
          {s(lang, "enter")}
        </button>
      </motion.div>
    </motion.div>
  );
}
