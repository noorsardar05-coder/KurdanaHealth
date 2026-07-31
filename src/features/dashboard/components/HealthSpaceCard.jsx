import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { recordSpaceVisit } from "../hooks/useRecentSpaces.js";

const EASE = [0.22, 1, 0.36, 1];

export default function HealthSpaceCard({ mod, lang, td, index, started }) {
  const title = mod.title[lang] || mod.title.en;
  const desc = mod.desc[lang] || mod.desc.en;
  const cta = started ? td("ctaContinue") : td("ctaOpen");
  const badge = started ? td("progressStarted") : td("progressNew");

  return (
    <motion.article
      className="kh-space"
      style={{ "--space-accent": mod.accent }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 4) * 0.04, duration: 0.4, ease: EASE }}
    >
      <Link
        to={`/category/${mod.slug}`}
        className="kh-space__link"
        onClick={() => recordSpaceVisit(mod.slug)}
      >
        <div className="kh-space__top">
          <span className="kh-space__icon" aria-hidden="true">
            {mod.icon}
          </span>
          <span className={`kh-space__badge ${started ? "is-started" : ""}`}>{badge}</span>
        </div>
        <h3 className="kh-space__title">{title}</h3>
        <p className="kh-space__desc">{desc}</p>
        <div className="kh-space__progress" aria-hidden="true">
          <span className="kh-space__progress-fill" style={{ width: started ? "35%" : "8%" }} />
        </div>
        <span className="kh-space__cta">
          {cta}
          <ChevronRight size={16} strokeWidth={2.25} className="rtl:-scale-x-100" />
        </span>
      </Link>
    </motion.article>
  );
}
