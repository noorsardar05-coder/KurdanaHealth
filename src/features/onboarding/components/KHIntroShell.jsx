import { motion } from "framer-motion";
import KurdishPatternBackground from "./KurdishPatternBackground.jsx";
import AnimatedAura from "./AnimatedAura.jsx";
import FloatingSymbols from "./FloatingSymbols.jsx";
import "../onboarding.css";

export default function KHIntroShell({ children, showOrbit = false }) {
  return (
    <div className="kh-intro" data-nosnippet>
      <div className="kh-intro__shell">
        <AnimatedAura />
        <KurdishPatternBackground />
        <FloatingSymbols />
        <div className="kh-intro__grain" aria-hidden="true" />
        {showOrbit && <OrbitRing />}
      </div>
      {children}
    </div>
  );
}

function OrbitRing() {
  return (
    <motion.div
      className="kh-orbit"
      style={{ width: 320, height: 320 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 1.2 },
        scale: { duration: 1.2 },
        rotate: { duration: 48, repeat: Infinity, ease: "linear" },
      }}
      aria-hidden="true"
    >
      <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
        <ellipse className="kh-orbit__ring" cx="160" cy="160" rx="140" ry="48" />
        <ellipse className="kh-orbit__ring" cx="160" cy="160" rx="48" ry="140" opacity="0.12" />
      </svg>
    </motion.div>
  );
}

export { OrbitRing };
