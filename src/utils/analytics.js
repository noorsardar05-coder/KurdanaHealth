/**
 * Google Analytics 4 (gtag) helpers for the Vite + React SPA.
 * Loads the tag at most once and supports HashRouter page views.
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || "";

let scriptRequested = false;

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

/** Load gtag.js once and configure GA4 (no automatic first page_view). */
export function initAnalytics() {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;
  if (window.__KH_GA_INITIALIZED__) return;

  ensureGtagStub();
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
  window.__KH_GA_INITIALIZED__ = true;

  if (scriptRequested) return;
  if (document.querySelector(`script[data-kh-ga="${MEASUREMENT_ID}"]`)) {
    scriptRequested = true;
    return;
  }

  scriptRequested = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  script.dataset.khGa = MEASUREMENT_ID;
  document.head.appendChild(script);
}

/** Record a SPA page view (HashRouter-safe path from React Router). */
export function trackPageView(pagePath) {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const path = pagePath || "/";
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function isAnalyticsEnabled() {
  return Boolean(MEASUREMENT_ID);
}
