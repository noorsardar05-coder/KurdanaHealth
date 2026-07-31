import { motion } from "framer-motion";
import { Shield, Pill, Dna, Bug } from "lucide-react";

const OBJECTS = [
  { Icon: Dna, x: "72%", y: "18%", size: 56, delay: 0, rotate: 15 },
  { Icon: Pill, x: "8%", y: "35%", size: 48, delay: 0.5, rotate: -20 },
  { Icon: Shield, x: "85%", y: "55%", size: 52, delay: 1, rotate: 10 },
  { Icon: Bug, x: "15%", y: "70%", size: 44, delay: 1.5, rotate: -12 },
  { Icon: Pill, x: "55%", y: "78%", size: 40, delay: 2, rotate: 25 },
];

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  delay: i * 0.3,
  size: 2 + (i % 3),
}));

export default function FloatingScene() {
  return (
    <div className="kh-float-scene" aria-hidden="true">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="kh-particle"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ opacity: [0.2, 0.7, 0.2], y: [0, -20, 0] }}
          transition={{ duration: 4 + (p.id % 3), repeat: Infinity, delay: p.delay }}
        />
      ))}
      {OBJECTS.map(({ Icon, x, y, size, delay, rotate }, i) => (
        <motion.div
          key={i}
          className="kh-float-obj kh-glass"
          style={{
            left: x,
            top: y,
            width: size + 28,
            height: size + 28,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          animate={{
            y: [0, -18, 8, 0],
            rotateX: [0, 12, -8, 0],
            rotateY: [rotate, rotate + 20, rotate - 10, rotate],
          }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={size} strokeWidth={1.2} className="text-[#7CF9F2]" style={{ opacity: 0.85 }} />
        </motion.div>
      ))}
    </div>
  );
}
