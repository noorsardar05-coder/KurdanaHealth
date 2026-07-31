import { Link } from "react-router-dom";
import { ArrowLeft, Globe2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LINKS = [
  { id: "symptom", key: "navSymptom" },
  { id: "recovery", key: "navRecovery" },
  { id: "library", key: "navLibrary" },
  { id: "compare", key: "navCompare" },
  { id: "play", key: "navPlay" },
  { id: "discover", key: "navDiscover" },
];

export default function KHHeader({ tc, toggleLang, lang, active, onNav }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="kh-header">
      <div className="kh-wrap kh-header__inner">
        <Link to="/dashboard" className="kh-btn kh-btn--text !p-0 gap-1.5">
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="hidden sm:inline">{tc("backHome")}</span>
        </Link>

        <span className="kh-logo">{tc("brand")}</span>

        <nav className="kh-nav" aria-label="Sections">
          {LINKS.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                onNav(id);
              }}
            >
              {tc(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            className="kh-lang"
            onClick={toggleLang}
            whileTap={{ scale: 0.97 }}
            aria-label="Switch language"
          >
            <Globe2 size={15} strokeWidth={1.5} />
            {lang === "en" ? "کوردی" : "EN"}
          </motion.button>
          <button type="button" className="kh-menu-btn md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#eceae6] md:hidden overflow-hidden"
          >
            <div className="kh-wrap py-4 flex flex-col gap-3">
              {LINKS.map(({ id, key }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-[#6b6560] text-sm py-1"
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(id);
                    setOpen(false);
                  }}
                >
                  {tc(key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
