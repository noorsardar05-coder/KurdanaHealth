import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------------- Hero ---- */
/* Minimal medical / wellness illustration — pulse heart in orbit. */
export function HeroIllustration() {
  return (
    <motion.svg
      viewBox="0 0 320 320"
      fill="none"
      className="kh-hero-art"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="khHeroGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="khHeroRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5FBF97" />
          <stop offset="100%" stopColor="#7FB4D6" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="150" r="120" fill="url(#khHeroGlow)" />

      <motion.circle
        cx="160"
        cy="150"
        r="104"
        stroke="url(#khHeroRing)"
        strokeWidth="1.25"
        strokeDasharray="4 10"
        opacity="0.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 150px" }}
      />
      <motion.circle
        cx="160"
        cy="150"
        r="78"
        stroke="#5FBF97"
        strokeWidth="1"
        opacity="0.25"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 150px" }}
      />

      {/* soft glass disc */}
      <circle cx="160" cy="150" r="62" fill="#ffffff" opacity="0.55" />
      <circle cx="160" cy="150" r="62" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />

      {/* heartbeat line */}
      <motion.path
        d="M112 150 h22 l10 -22 16 44 12 -30 8 8 h20"
        stroke="#2E8B63"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
      />

      {/* orbiting pills / dots */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 150px" }}
      >
        <circle cx="160" cy="46" r="10" fill="#ffffff" stroke="#7FB4D6" strokeWidth="1.5" />
        <circle cx="160" cy="46" r="3.5" fill="#7FB4D6" />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 150px" }}
      >
        <circle cx="264" cy="150" r="7" fill="#ffffff" stroke="#E0A26B" strokeWidth="1.5" />
      </motion.g>

      <motion.circle
        cx="70"
        cy="90"
        r="14"
        fill="#F4CFD8"
        opacity="0.7"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="250"
        cy="250"
        r="10"
        fill="#C9B8ED"
        opacity="0.7"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------- Metric tiles ---- */
export function MetricIllustration({ type }) {
  const c = { fill: "none", "aria-hidden": true };
  switch (type) {
    case "mood":
      return (
        <svg viewBox="0 0 96 96" width="88" height="88" {...c}>
          <circle cx="48" cy="48" r="34" fill="currentColor" opacity="0.1" />
          <circle cx="48" cy="48" r="30" fill="#ffffff" opacity="0.65" />
          <circle cx="48" cy="48" r="30" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
          <circle cx="38" cy="42" r="3" fill="currentColor" />
          <circle cx="58" cy="42" r="3" fill="currentColor" />
          <motion.path
            d="M36 56 q12 12 24 0"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ d: ["M36 56 q12 12 24 0", "M36 58 q12 9 24 0", "M36 56 q12 12 24 0"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      );
    case "sleep":
      return (
        <svg viewBox="0 0 72 72" width="58" height="58" {...c}>
          <motion.path
            d="M50 42a18 18 0 1 1-20-24 15 15 0 0 0 20 24z"
            fill="#ffffff"
            opacity="0.7"
            stroke="currentColor"
            strokeWidth="1.75"
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "36px 36px" }}
          />
          <motion.g
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <path d="M50 20h8l-8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        </svg>
      );
    case "activity":
      return (
        <svg viewBox="0 0 72 72" width="58" height="58" {...c}>
          {[0, 1, 2, 3].map((i) => (
            <motion.rect
              key={i}
              x={16 + i * 12}
              width="7"
              rx="3.5"
              fill="currentColor"
              opacity={0.55 + i * 0.12}
              initial={{ height: 8, y: 44 }}
              animate={{ height: [10, 22 + i * 6, 10], y: [42, 30 - i * 6, 42] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 72 72" width="54" height="54" {...c}>
          <path
            d="M36 16c9 12 15 20 15 28a15 15 0 0 1-30 0c0-8 6-16 15-28z"
            fill="#ffffff"
            opacity="0.6"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <motion.path
            d="M27 46a9 9 0 0 0 12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      );
    case "nutrition":
      return (
        <svg viewBox="0 0 72 72" width="56" height="56" {...c}>
          <motion.g
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "36px 40px" }}
          >
            <path
              d="M36 24c8 0 14 6 14 15s-6 17-14 17-14-8-14-17 6-15 14-15z"
              fill="#ffffff"
              opacity="0.65"
              stroke="currentColor"
              strokeWidth="1.75"
            />
            <path d="M36 24c0-5 3-8 8-9-1 5-3 8-8 9z" fill="currentColor" opacity="0.8" />
            <path d="M30 40c2 3 10 3 12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          </motion.g>
        </svg>
      );
    default:
      return null;
  }
}

/* --------------------------------------------------- Health Space art ---- */
export function SpaceIllustration({ type }) {
  const c = { fill: "none", "aria-hidden": true };
  switch (type) {
    case "antibiotics":
      /* DNA helix + molecule — medical */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "60px 60px" }}
            opacity="0.9"
          >
            <path d="M42 24c24 12 24 60 0 72" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
            <path d="M78 24c-24 12-24 60 0 72" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
            {[30, 44, 60, 76, 90].map((y, i) => (
              <line key={i} x1="46" y1={y} x2="74" y2={y} stroke="currentColor" strokeWidth="1.75" opacity="0.55" />
            ))}
            <circle cx="46" cy="30" r="3.5" fill="currentColor" />
            <circle cx="74" cy="30" r="3.5" fill="currentColor" />
            <circle cx="46" cy="90" r="3.5" fill="currentColor" />
            <circle cx="74" cy="90" r="3.5" fill="currentColor" />
          </motion.g>
        </svg>
      );
    case "fitness":
      /* runner in motion */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <circle cx="70" cy="28" r="9" fill="currentColor" opacity="0.9" />
          <motion.g
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "62px 60px" }}
          >
            <path d="M66 40 l-8 24 12 10" />
            <path d="M58 64 l-14 18" />
            <path d="M70 74 l14 4" />
            <path d="M66 44 l18 6" opacity="0.85" />
            <path d="M66 44 l-18 2" opacity="0.85" />
          </motion.g>
          <motion.path
            d="M20 96 h80"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 10"
            opacity="0.4"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );
    case "beauty":
      /* skincare — face + dewy drop */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <path
            d="M60 24c18 0 30 14 30 34 0 22-14 40-30 40S30 80 30 58c0-20 12-34 30-34z"
            fill="#ffffff"
            opacity="0.55"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M48 58q12 10 24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <motion.circle
            cx="60" cy="46" r="5"
            fill="currentColor" opacity="0.7"
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: "60px 46px" }}
          />
          <path d="M82 34l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill="currentColor" opacity="0.7" />
        </svg>
      );
    case "mental":
      /* calm brain / meditation head */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <motion.g
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 58px" }}
          >
            <path
              d="M60 26c16 0 28 12 28 28 0 18-12 32-28 32S32 72 32 54c0-16 12-28 28-28z"
              fill="#ffffff"
              opacity="0.55"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M60 40v34M46 54h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
            <circle cx="60" cy="54" r="7" fill="currentColor" opacity="0.65" />
          </motion.g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="60" cy="58" r={30 + i * 8}
              stroke="currentColor" strokeWidth="1.25" opacity="0.2"
              animate={{ scale: [0.9, 1.1], opacity: [0.25, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "60px 58px" }}
            />
          ))}
        </svg>
      );
    case "nutrition":
      /* fruit — apple + leaf */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <motion.g
            animate={{ rotate: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 66px" }}
          >
            <path
              d="M60 42c14 0 24 10 24 26S72 96 60 96 36 84 36 68s10-26 24-26z"
              fill="#ffffff"
              opacity="0.55"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M60 42c0-9 5-15 14-16-1 9-5 15-14 16z" fill="currentColor" opacity="0.85" />
            <path d="M60 42c0-8-5-13-13-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </motion.g>
          <circle cx="40" cy="40" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="86" cy="80" r="3" fill="currentColor" opacity="0.4" />
        </svg>
      );
    case "mothers":
      /* mother & baby */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <circle cx="52" cy="34" r="12" fill="currentColor" opacity="0.9" />
          <path
            d="M34 92c0-18 8-30 18-30s18 12 18 30z"
            fill="#ffffff"
            opacity="0.55"
            stroke="currentColor"
            strokeWidth="2"
          />
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="78" cy="60" r="8" fill="currentColor" opacity="0.75" />
            <path d="M68 88c0-11 5-18 10-18s10 7 10 18z" fill="currentColor" opacity="0.4" />
          </motion.g>
          <path d="M60 66q8 4 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "bodywise":
      /* anatomy — figure with organ nodes */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          <circle cx="60" cy="26" r="10" stroke="currentColor" strokeWidth="2" fill="#ffffff" opacity="0.6" />
          <path
            d="M60 36v36M60 46l-18 8M60 46l18 8M60 72l-12 22M60 72l12 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {[
            [60, 52],
            [48, 58],
            [72, 58],
            [54, 80],
            [66, 80],
          ].map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x} cy={y} r="4"
              fill="currentColor"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </svg>
      );
    default:
      /* community — connected people */
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" {...c}>
          {[
            [40, 44],
            [80, 44],
            [60, 78],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y - 10} r="8" fill="currentColor" opacity="0.85" />
              <path d={`M${x - 12} ${y + 16}c0-9 5-14 12-14s12 5 12 14z`} fill="#ffffff" opacity="0.5" stroke="currentColor" strokeWidth="1.75" />
            </g>
          ))}
          <path d="M46 42l28 0M52 60l16 12M68 60l-16 12" stroke="currentColor" strokeWidth="1.5" opacity="0.35" strokeLinecap="round" />
        </svg>
      );
  }
}
