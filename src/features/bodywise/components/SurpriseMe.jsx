import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dices, X } from "lucide-react";
import { randomFact } from "../data/facts.js";
import { s } from "../data/ui.js";

export default function SurpriseMe({ lang }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const surprise = () => {
    const next = randomFact(payload?.index ?? -1);
    setPayload(next);
    setOpen(true);
  };

  return (
    <>
      <motion.button
        type="button"
        className="bw-surprise-fab"
        onClick={surprise}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={s(lang, "surprise")}
      >
        <Dices size={20} />
        <span>{s(lang, "surprise")}</span>
      </motion.button>

      <AnimatePresence>
        {open && payload && (
          <motion.div
            className="bw-surprise-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bw-surprise-card"
              initial={{ scale: 0.86, y: 24, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="bw-icon-btn bw-surprise-close"
                onClick={() => setOpen(false)}
                aria-label={s(lang, "close")}
              >
                <X size={18} />
              </button>
              <span className="bw-surprise-emoji">🎲</span>
              <h3>{s(lang, "surprise")}</h3>
              <p>{payload.fact[lang]}</p>
              <button type="button" className="bw-btn bw-btn-primary" onClick={surprise}>
                {s(lang, "surprise")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
