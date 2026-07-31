import { Link } from "react-router-dom";

import { Settings } from "lucide-react";



export default function DashboardNav({

  brand,

  author,

  logoutLabel,

  settingsLabel,

  onLogout,

  todayLabel,

}) {

  return (

    <nav className="kh-dash-nav">

      <div className="kh-dash-nav__inner">

        <div>

          <Link to="/dashboard" className="kh-dash-nav__brand">

            {brand}

          </Link>

          {author && <p className="kh-dash-nav__author">{author}</p>}

        </div>

        <div className="kh-dash-nav__actions">

          <span className="kh-dash-nav__date">{todayLabel}</span>

          <Link to="/settings" className="kh-dash-nav__pill kh-dash-nav__pill--link">

            <Settings size={14} strokeWidth={1.5} />

            {settingsLabel}

          </Link>

          <button type="button" className="kh-dash-nav__logout" onClick={onLogout}>

            {logoutLabel}

          </button>

        </div>

      </div>

    </nav>

  );

}


