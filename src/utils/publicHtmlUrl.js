/** Absolute URL for a file under /public (works with HashRouter, subfolders & Live Server). */
export function publicHtmlUrl(relativeFromPublicRoot) {
  const rel = relativeFromPublicRoot.replace(/^\//, "");
  const base = import.meta.env.BASE_URL || "/";
  return new URL(rel, new URL(base, window.location.href)).href;
}
