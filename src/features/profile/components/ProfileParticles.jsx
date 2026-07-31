import { motion } from "framer-motion";

const DOTS = [
  { x: "15%", y: "20%", s: 4 },
  { x: "85%", y: "25%", s: 3 },
  { x: "78%", y: "70%", s: 5 },
  { x: "22%", y: "75%", s: 3 },
  { x: "50%", y: "12%", s: 2 },
];

export default function ProfileParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#3d9970]"
          style={{ left: d.x, top: d.y, width: d.s, height: d.s, opacity: 0.08 }}
          animate={{ y: [0, -6, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}
