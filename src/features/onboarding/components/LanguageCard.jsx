import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function LanguageCard({ label, selected, onClick, kurdish = false }) {
  return (
    <motion.button
      type="button"
      className={`kh-lang-card ${selected ? "selected" : ""}`}
      onClick={onClick}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <span className={`kh-lang-card__label ${kurdish ? "kh-lang-card__label--ku" : ""}`} dir={kurdish ? "rtl" : "ltr"} lang={kurdish ? "ku" : "en"}>
        {label}
      </span>
      <span className="kh-lang-card__check" aria-hidden="true">
        {selected && <Check size={11} strokeWidth={2.5} />}
      </span>
    </motion.button>
  );
}
