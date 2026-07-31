import { Link } from "react-router-dom";
import { Globe2 } from "lucide-react";

export default function FitnessHeader({ t, lang, onToggleLang }) {
  return (
    <header className="ft-header glass">
      <div className="ft-header__left">
        <p className="ft-header__badge">{t("brandBadge")}</p>
        <h1 className="ft-header__title">{t("title")}</h1>
        <p className="ft-header__sub">{t("subtitle")}</p>
      </div>
      <div className="ft-header__actions">
        <button type="button" className="ft-btn ft-btn--ghost" onClick={onToggleLang}>
          <Globe2 size={15} strokeWidth={1.75} />
          {lang === "en" ? t("langToggle") : t("langToggleActive")}
        </button>
        <Link to="/dashboard" className="ft-btn ft-btn--ghost">
          {t("backDashboard")}
        </Link>
      </div>
    </header>
  );
}
