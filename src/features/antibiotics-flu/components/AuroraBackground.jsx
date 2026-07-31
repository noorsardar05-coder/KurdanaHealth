import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="kh-aurora" aria-hidden="true">
      <div className="kh-aurora__grid" />
      <motion.div
        className="kh-aurora__blob kh-aurora__blob--1"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="kh-aurora__blob kh-aurora__blob--2"
        animate={{ x: [0, -50, 20, 0], y: [0, -25, 40, 0], scale: [1, 0.92, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="kh-aurora__blob kh-aurora__blob--3"
        animate={{ x: [0, 30, -30, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
