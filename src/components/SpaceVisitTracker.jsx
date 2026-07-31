import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordSpaceVisit } from "../features/dashboard/hooks/useRecentSpaces.js";

const SPACE_SLUGS = new Set([
  "mental-health",
  "beauty",
  "fitness",
  "bodywise",
  "first-time-mothers",
  "antibiotics-flu",
  "nutrition-diets",
  "noor-community",
]);

/** Records Health Space visits from any /category/:slug route. */
export default function SpaceVisitTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    const match = pathname.match(/^\/category\/([^/]+)/);
    if (!match) return;
    const slug = match[1];
    if (SPACE_SLUGS.has(slug)) recordSpaceVisit(slug);
  }, [pathname]);

  return null;
}
