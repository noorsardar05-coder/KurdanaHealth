import { publicHtmlUrl } from "../../../utils/publicHtmlUrl.js";

/** Resolve a relative public path to absolute URL. */
export function mediaUrl(relativePath) {
  if (!relativePath) return "";
  if (relativePath.startsWith("http") || relativePath.startsWith("blob:")) return relativePath;
  const clean = relativePath.replace(/^\//, "");
  return publicHtmlUrl(clean);
}

/** Probe whether a media URL exists (HEAD request). */
export async function probeMediaUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

/** Find first available candidate via HEAD probes (cached). */
const probeCache = new Map();

export async function findAvailableMedia(candidates) {
  for (const candidate of candidates) {
    const url = mediaUrl(candidate.src);
    const cacheKey = url;
    if (probeCache.has(cacheKey)) {
      if (probeCache.get(cacheKey)) return { ...candidate, url };
      continue;
    }
    const ok = await probeMediaUrl(url);
    probeCache.set(cacheKey, ok);
    if (ok) return { ...candidate, url };
  }
  return null;
}

export function clearMediaProbeCache() {
  probeCache.clear();
}
