import { Link } from "react-router-dom";
import { ArrowLeft, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar({ tc, toggleLang, lang }) {
  return (
    <header className="kh-topbar">
      <Link to="/dashboard" className="kh-topbar__pill">
        <ArrowLeft size={16} />
        <span>{tc("backHome")}</span>
      </Link>
      <span className="kh-topbar__brand">{tc("brand")}</span>
      <motion.button
        type="button"
        className="kh-topbar__pill"
        onClick={toggleLang}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Switch language"
      >
        <Globe2 size={16} />
        <span>{lang === "en" ? "کوردی" : "English"}</span>
      </motion.button>
    </header>
  );
}
