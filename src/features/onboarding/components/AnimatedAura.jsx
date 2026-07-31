import { motion } from "framer-motion";

const BLOBS = [
  { className: "kh-aura__blob kh-aura__blob--1", animate: { x: [0, 24, -12, 0], y: [0, -18, 10, 0] } },
  { className: "kh-aura__blob kh-aura__blob--2", animate: { x: [0, -20, 14, 0], y: [0, 16, -8, 0] } },
  { className: "kh-aura__blob kh-aura__blob--3", animate: { x: [0, 12, -16, 0], y: [0, 10, -14, 0] } },
];

export default function AnimatedAura() {
  return (
    <div className="kh-aura" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className={blob.className}
          animate={blob.animate}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
