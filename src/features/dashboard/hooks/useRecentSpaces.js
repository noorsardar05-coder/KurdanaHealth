import { useCallback, useEffect, useState } from "react";

const KEY = "kh_recent_spaces_v1";
const MAX = 4;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function save(slugs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs.slice(0, MAX)));
  } catch {
    /* ignore */
  }
}

export function recordSpaceVisit(slug) {
  if (!slug || typeof slug !== "string") return;
  const prev = load().filter((s) => s !== slug);
  save([slug, ...prev]);
}

export function useRecentSpaces() {
  const [recent, setRecent] = useState(() => load());

  useEffect(() => {
    setRecent(load());
  }, []);

  const refresh = useCallback(() => setRecent(load()), []);

  return { recent, refresh };
}
