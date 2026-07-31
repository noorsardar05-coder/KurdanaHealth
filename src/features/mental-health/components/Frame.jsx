import { Link } from "react-router-dom";
import {
  Home,
  Sparkles,
  HeartHandshake,
  Stars,
  TreePine,
  MessageCircle,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { t } from "../i18n/strings.js";
import CompanionOrb from "./CompanionOrb.jsx";

/** Calm five-tab shell — flagship mental health experience. */
const TABS = [
  { id: "home", icon: Home, labelKey: "home" },
  { id: "tools", icon: HeartHandshake, labelKey: "care" },
  { id: "discover", icon: Sparkles, labelKey: "discover" },
  { id: "track", icon: Stars, labelKey: "track" },
  { id: "community", icon: TreePine, labelKey: "community" },
];

export default function Frame({
  lang,
  setLang,
  tab,
  setTab,
  mood,
  darkMode,
  onToggleDark,
  onAsk,
  children,
}) {
  const tx = (k) => t(k, lang);

  return (
    <div className={`mh ${lang === "ku" ? "is-ku" : ""} mood-${mood || "unknown"} ${darkMode ? "is-dark" : ""}`}>
      <div className="mh-aurora" aria-hidden="true" />
      <div className="mh-shell">
        <header className="mh-top">
          <div className="mh-top__brand">
            <CompanionOrb size="sm" mood={mood} onClick={onAsk} />
            <div>
              <span className="mh-top__name mh-display">{tx("brand")}</span>
              <span className="mh-top__sub">{tx("space")}</span>
            </div>
          </div>
          <div className="mh-top__actions">
            <button type="button" className="mh-icon-btn" onClick={onToggleDark} aria-label="theme">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="mh-lang">
              <button type="button" className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")}>
                {tx("langEn")}
              </button>
              <button type="button" className={lang === "ku" ? "is-on" : ""} onClick={() => setLang("ku")}>
                {tx("langKu")}
              </button>
            </div>
            <button type="button" className="mh-pill mh-pill--accent" onClick={onAsk}>
              <MessageCircle size={15} />
              <span>{tx("talk")}</span>
            </button>
            <Link to="/dashboard" className="mh-icon-btn" title={tx("leave")}>
              <LogOut size={16} />
            </Link>
          </div>
        </header>

        <main className="mh-main">{children}</main>

        <nav className="mh-nav" aria-label="Mental health">
          <div className="mh-nav__row">
            {TABS.map(({ id, icon: Icon, labelKey }) => (
              <button
                key={id}
                type="button"
                className={`mh-nav__item ${tab === id ? "is-on" : ""}`}
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon strokeWidth={tab === id ? 2.2 : 1.7} size={20} />
                <span>{tx(labelKey)}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
