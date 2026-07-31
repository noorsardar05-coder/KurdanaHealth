import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

const sceneTransition = {
  initial: { opacity: 0, filter: "blur(8px)", scale: 0.98 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.85, ease: EASE },
  },
  exit: {
    opacity: 0,
    filter: "blur(6px)",
    scale: 0.985,
    transition: { duration: 0.65, ease: EASE },
  },
};

export function CinematicScene({ children, className = "" }) {
  return (
    <motion.div className={`kh-intro__stage ${className}`} {...sceneTransition}>
      {children}
    </motion.div>
  );
}

export function CinematicEyebrow({ children, delay = 0 }) {
  return (
    <motion.p
      className="kh-cine-eyebrow"
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.p>
  );
}

export function CinematicText({ children, className = "", delay = 0.15, glowPulse = false }) {
  return (
    <div className="relative">
      {glowPulse && (
        <motion.div
          className="kh-cine-glow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 0.7, 0.35], scale: [0.9, 1.05, 1] }}
          transition={{ duration: 2, ease: EASE, delay: delay + 0.2 }}
          aria-hidden="true"
        />
      )}
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function PulseLine({ delay = 0.4 }) {
  return (
    <motion.svg
      className="kh-pulse-line"
      viewBox="0 0 280 28"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{ duration: 1.4, ease: EASE, delay }}
      aria-hidden="true"
    >
      <motion.path
        d="M0 14 H40 L52 6 L64 22 L76 10 L88 18 L100 14 H280"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay }}
      />
    </motion.svg>
  );
}

export { sceneTransition, EASE };
