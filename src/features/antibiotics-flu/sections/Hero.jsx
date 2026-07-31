import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import MagneticButton from "../components/MagneticButton.jsx";

export default function Hero({ tc, onBegin }) {
  return (
    <section className="kh-hero" id="top">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#00D1C7] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles size={16} />
          Kurdana Health
        </motion.p>
        <h1 className="kh-hero__title">
          <span className="kh-gradient-text">{tc("heroLine1")}</span>
          <span className="kh-hero__title-line2 kh-gradient-text-accent">{tc("heroLine2")}</span>
        </h1>
        <p className="kh-hero__sub">{tc("heroSub")}</p>
        <div className="kh-hero__actions">
          <MagneticButton onClick={onBegin}>{tc("heroCta")}</MagneticButton>
          <MagneticButton variant="ghost" onClick={() => document.getElementById("symptom")?.scrollIntoView({ behavior: "smooth" })}>
            {tc("heroScroll")}
          </MagneticButton>
        </div>
      </motion.div>
      <div className="kh-hero__scroll">
        <ChevronDown size={18} />
        <span>{tc("heroScroll")}</span>
      </div>
    </section>
  );
}
