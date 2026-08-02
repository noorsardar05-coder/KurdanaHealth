import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../utils/analytics.js";

/**
 * Tracks GA4 page views on HashRouter navigations (and the initial route).
 * Renders nothing; must sit inside HashRouter.
 */
export default function AnalyticsTracker() {
  const location = useLocation();
  const lastPathRef = useRef("");

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    initAnalytics();
    const path = `${location.pathname}${location.search}` || "/";
    if (path === lastPathRef.current) return;
    lastPathRef.current = path;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
