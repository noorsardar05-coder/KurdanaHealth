import { motion } from "framer-motion";

function getGreeting(t, userName) {
  const firstName = userName?.trim().split(/\s+/)[0];
  if (!firstName) return t("welcomeBack");
  const hour = new Date().getHours();
  let key = "greetAfternoon";
  if (hour < 12) key = "greetMorning";
  else if (hour >= 17) key = "greetEvening";
  return `${t(key)}, ${firstName}.`;
}

export default function BeautyHero({ t, userName, onContinueRoutine, routineProgress }) {
  const greeting = getGreeting(t, userName);
  const pct = routineProgress?.pct ?? 0;

  return (
    <header className="bt-hero">
      <p className="bt-hero__eyebrow">{t("brandBadge")}</p>
      <motion.h1
        className="bt-greeting"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {greeting}
      </motion.h1>
      <motion.p
        className="bt-hero__sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
      >
        {t("homeSub")}
      </motion.p>
      <motion.div
        className="bt-hero-banner"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <div>
          <p className="bt-section-label">{t("todaysRoutine")}</p>
          <p className="bt-hero-banner__pct">{pct}% {t("complete")}</p>
        </div>
        <button type="button" className="bt-hero-cta" onClick={onContinueRoutine}>
          {t("continueRoutine")}
        </button>
      </motion.div>
    </header>
  );
}
