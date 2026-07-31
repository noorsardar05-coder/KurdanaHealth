import { motion } from "framer-motion";
import { Brain, TrendingUp, Orbit, GitCompare, Gamepad2, BookOpen } from "lucide-react";

const SECTIONS = [
  { id: "symptom", icon: Brain, labelKey: "navSymptom" },
  { id: "recovery", icon: TrendingUp, labelKey: "navRecovery" },
  { id: "universe", icon: Orbit, labelKey: "navUniverse" },
  { id: "compare", icon: GitCompare, labelKey: "navCompare" },
  { id: "play", icon: Gamepad2, labelKey: "navPlay" },
  { id: "feed", icon: BookOpen, labelKey: "navFeed" },
];

export default function NavDock({ active, onNavigate, tc }) {
  return (
    <nav className="kh-dock kh-glass" aria-label="Section navigation">
      {SECTIONS.map(({ id, icon: Icon, labelKey }) => (
        <motion.button
          key={id}
          type="button"
          className={`kh-dock__item ${active === id ? "active" : ""}`}
          onClick={() => onNavigate(id)}
          whileTap={{ scale: 0.92 }}
        >
          <Icon size={18} strokeWidth={1.75} />
          <span>{tc(labelKey)}</span>
        </motion.button>
      ))}
    </nav>
  );
}
