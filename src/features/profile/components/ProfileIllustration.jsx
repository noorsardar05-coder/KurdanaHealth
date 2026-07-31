import { motion } from "framer-motion";

export default function ProfileIllustration() {
  return (
    <motion.svg
      width="200"
      height="120"
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.circle
        cx="100"
        cy="60"
        r="42"
        stroke="#D4EDE4"
        strokeWidth="1"
        fill="none"
        animate={{ scale: [1, 1.03, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 60px" }}
      />
      <motion.circle
        cx="100"
        cy="60"
        r="28"
        stroke="#3D9970"
        strokeWidth="0.75"
        fill="none"
        opacity="0.35"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 60px" }}
      />
      <ellipse cx="100" cy="60" rx="48" ry="16" stroke="#E8F6F3" strokeWidth="1" fill="none" opacity="0.6" />
      <path
        d="M100 38c-8 0-14 6-14 14v12c0 8 6 14 14 14s14-6 14-14V52c0-8-6-14-14-14z"
        stroke="#2F8F6B"
        strokeWidth="1.25"
        fill="white"
        opacity="0.9"
      />
      <motion.path
        d="M52 72 Q72 58 100 68 T148 72"
        stroke="#3D9970"
        strokeWidth="1.25"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.path
        d="M68 48 Q76 40 84 48"
        stroke="#D4EDE4"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <circle cx="132" cy="42" r="4" fill="#E8F6F3" stroke="#D4EDE4" strokeWidth="0.75" />
      <circle cx="64" cy="88" r="3" fill="#E8F6F3" stroke="#D4EDE4" strokeWidth="0.75" />
    </motion.svg>
  );
}
