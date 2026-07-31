import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SPACE_MODULES } from "../i18n/dashboardStrings.js";
import { recordSpaceVisit } from "../hooks/useRecentSpaces.js";

const EASE = [0.22, 1, 0.36, 1];

export default function ContinueLearning({ slugs, lang, td }) {
  if (!slugs?.length) return null;

  const items = slugs
    .map((slug) => SPACE_MODULES.find((m) => m.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <motion.section
      className="kh-section kh-continue"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
    >
      <div className="kh-section__head">
        <h2 className="kh-section__title">{td("continueTitle")}</h2>
        <p className="kh-section__sub">{td("continueSub")}</p>
      </div>

      <div className="kh-continue__list">
        {items.map((mod) => {
          const title = mod.title[lang] || mod.title.en;
          return (
            <Link
              key={mod.slug}
              to={`/category/${mod.slug}`}
              className="kh-continue__item"
              style={{ "--space-accent": mod.accent }}
              onClick={() => recordSpaceVisit(mod.slug)}
            >
              <span className="kh-continue__icon" aria-hidden="true">
                {mod.icon}
              </span>
              <span className="kh-continue__label">
                {td("continuePrefix")} {title}
              </span>
              <ArrowRight size={15} strokeWidth={2.25} className="kh-continue__arrow rtl:-scale-x-100" />
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
