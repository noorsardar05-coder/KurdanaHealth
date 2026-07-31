import { Link } from "react-router-dom";
import {
  Home,
  HeartPulse,
  Baby,
  Sparkles,
  Package,
  Milk,
  LogOut,
} from "lucide-react";
import { t } from "../i18n/strings.js";

const TABS = [
  { id: "home", icon: Home, labelKey: "home" },
  { id: "recovery", icon: HeartPulse, labelKey: "recovery" },
  { id: "feeding", icon: Milk, labelKey: "feeding" },
  { id: "baby", icon: Baby, labelKey: "baby" },
  { id: "discover", icon: Sparkles, labelKey: "discover" },
  { id: "essentials", icon: Package, labelKey: "essentials" },
];

export default function Frame({ lang, setLang, tab, setTab, children }) {
  const tx = (k) => t(k, lang);

  return (
    <div className={`ftm ${lang === "ku" ? "is-ku" : ""}`}>
      <div className="ftm-shell">
        <header className="ftm-top">
          <div className="ftm-top__brand">
            <span className="ftm-top__name ftm-display">{tx("brand")}</span>
            <span className="ftm-top__sub">{tx("companion")}</span>
          </div>
          <div className="ftm-top__actions">
            <div className="ftm-lang-toggle">
              <button
                type="button"
                className={lang === "en" ? "is-active" : ""}
                onClick={() => setLang("en")}
              >
                {tx("langEn")}
              </button>
              <button
                type="button"
                className={lang === "ku" ? "is-active" : ""}
                onClick={() => setLang("ku")}
              >
                {tx("langKu")}
              </button>
            </div>
            <Link to="/dashboard" className="ftm-btn ftm-btn--ghost" title={tx("leave")}>
              <LogOut size={16} />
            </Link>
          </div>
        </header>

        <main className="ftm-main">{children}</main>

        <nav className="ftm-nav" aria-label="Companion navigation">
          <div className="ftm-nav__inner">
            {TABS.map(({ id, icon: Icon, labelKey }) => (
              <button
                key={id}
                type="button"
                className={`ftm-nav__item ${tab === id ? "is-active" : ""}`}
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon strokeWidth={tab === id ? 2.2 : 1.8} />
                <span>{tx(labelKey)}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
