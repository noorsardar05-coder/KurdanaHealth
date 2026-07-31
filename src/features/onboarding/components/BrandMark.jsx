import { motion } from "framer-motion";

export default function BrandMark({ large = false, animate = true }) {
  const Wrapper = animate ? motion.div : "div";
  const props = animate
    ? {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <Wrapper className={`kh-mark ${large ? "kh-mark--lg" : ""}`} {...props} aria-hidden="true">
      <svg className="kh-mark__svg" viewBox="0 0 64 64" fill="none">
        <motion.g
          animate={animate ? { rotate: 360 } : undefined}
          transition={animate ? { duration: 24, repeat: Infinity, ease: "linear" } : undefined}
          style={{ transformOrigin: "32px 32px" }}
        >
          <circle cx="32" cy="32" r="28" stroke="#3D9970" strokeWidth="1" opacity="0.25" />
        </motion.g>
        <circle cx="32" cy="32" r="20" stroke="#D4EDE4" strokeWidth="0.75" opacity="0.5" />
        <path d="M32 22v20M22 32h20" stroke="#2F8F6B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <motion.path
          d="M32 14 Q38 20 32 26 Q26 20 32 14"
          fill="#3D9970"
          opacity="0.35"
          animate={animate ? { opacity: [0.25, 0.45, 0.25] } : undefined}
          transition={animate ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
        <circle cx="32" cy="32" r="3" fill="#3D9970" opacity="0.5" />
      </svg>
    </Wrapper>
  );
}
