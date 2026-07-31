import { Link } from "react-router-dom";
import { Home, BookOpen, Archive, LogOut } from "lucide-react";
import { t } from "../i18n/index.js";

const TABS = [
  { id: "home", icon: Home, labelKey: "home" },
  { id: "discover", icon: BookOpen, labelKey: "discover" },
  { id: "archive", icon: Archive, labelKey: "archive" },
];

export default function Frame({ lang, setLang, tab, setTab, children }) {
  const tx = (k, vars) => t(k, lang, vars);

  return (
    <div className={`noor ${lang === "ku" ? "is-ku" : ""}`} dir={lang === "ku" ? "rtl" : "ltr"} lang={lang === "ku" ? "ckb" : "en"}>
      <div className="noor-shell">
        <header className="noor-top">
          <div className="noor-top__brand">
            <span className="noor-top__name noor-display">{tx("brand")}</span>
            <span className="noor-top__sub">{tx("tagline")}</span>
          </div>
          <div className="noor-top__actions">
            <div className="noor-lang" role="group" aria-label="Language">
              <button type="button" className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")}>
                {tx("langEn")}
              </button>
              <button type="button" className={lang === "ku" ? "is-on" : ""} onClick={() => setLang("ku")}>
                {tx("langKu")}
              </button>
            </div>
            <Link to="/dashboard" className="noor-icon-btn" title={tx("leave")}>
              <LogOut size={16} />
            </Link>
          </div>
        </header>

        <main className="noor-main">{children}</main>

        <nav className="noor-nav" aria-label={tx("brand")}>
          <div className="noor-nav__inner">
            {TABS.map(({ id, icon: Icon, labelKey }) => (
              <button
                key={id}
                type="button"
                className={`noor-nav__item ${tab === id ? "is-on" : ""}`}
                onClick={() => setTab(id)}
                aria-current={tab === id ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={tab === id ? 2.3 : 1.8} />
                <span>{tx(labelKey)}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
