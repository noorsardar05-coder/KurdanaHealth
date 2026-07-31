/** Slugify exercise name for media file lookup. */
export function slugify(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function camelToKebab(text) {
  return (text || "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

/** Collect unique slug keys for an exercise (most specific → fallback). */
export function getMediaSlugs(ex) {
  const slugs = [];
  const add = (s) => {
    const v = slugify(s);
    if (v && !slugs.includes(v)) slugs.push(v);
  };

  if (ex.media?.slug) add(ex.media.slug);
  if (ex.id) add(ex.id);
  if (ex.animationType) add(ex.animationType.replace(/_/g, "-"));
  if (ex.coachType) add(camelToKebab(ex.coachType));

  const baseName = (ex.nameEn || "").split("—")[0].split("-")[0].trim();
  add(baseName);
  add(ex.nameEn);

  return slugs;
}
