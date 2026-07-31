import { motion } from "framer-motion";
import { Leaf, Plus, Activity } from "lucide-react";

const SYMBOLS = [
  { Icon: Plus, x: "12%", y: "18%", size: 14, delay: 0 },
  { Icon: Leaf, x: "82%", y: "22%", size: 16, delay: 0.4 },
  { Icon: Activity, x: "78%", y: "72%", size: 15, delay: 0.8 },
  { Icon: Plus, x: "18%", y: "78%", size: 12, delay: 1.2 },
  { Icon: Leaf, x: "88%", y: "48%", size: 13, delay: 0.6 },
  { Icon: Activity, x: "8%", y: "52%", size: 14, delay: 1 },
];

export default function FloatingSymbols() {
  return (
    <div className="kh-floats" aria-hidden="true">
      {SYMBOLS.map(({ Icon, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="kh-float"
          style={{ left: x, top: y }}
          animate={{ y: [0, -8, 0], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={size} strokeWidth={1.25} />
        </motion.div>
      ))}
    </div>
  );
}
