import { motion } from "framer-motion";

export default function BeautyOnboarding({ t, onStartQuiz }) {
  return (
    <div className="bt-onboard">
      <motion.div
        className="bt-onboard__card glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="bt-sidebar__badge">{t("brandBadge")}</p>
        <h1 className="bt-onboard__title">{t("onboardTitle")}</h1>
        <p style={{ color: "var(--bt-mauve)", lineHeight: 1.55, margin: "0 0 1.5rem" }}>
          {t("onboardDesc")}
        </p>
        <button type="button" className="bt-hero-cta" onClick={onStartQuiz}>
          {t("startQuiz")}
        </button>
        <p style={{ fontSize: "0.78rem", color: "var(--bt-mauve)", marginTop: "1rem" }}>
          {t("onboardHint")}
        </p>
      </motion.div>
    </div>
  );
}
