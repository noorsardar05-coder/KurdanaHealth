import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function HeroWelcome({ welcomeBack, name, quote, attribution, sep = "," }) {
  return (
    <motion.section
      className="kh-hero"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <h1 className="kh-hero__title">
        {welcomeBack}
        {sep} <span className="kh-hero__name">{name}</span>
      </h1>
      <p className="kh-hero__quote">“{quote}”</p>
      <p className="kh-hero__attr">{attribution}</p>
    </motion.section>
  );
}
