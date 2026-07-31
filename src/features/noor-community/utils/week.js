/** Week helpers for Noor Community rotations. */

export function startOfNextWeek(from = new Date()) {
  const d = new Date(from);
  const day = d.getDay(); // 0 Sun … 6 Sat
  const daysUntilMonday = day === 0 ? 1 : day === 1 ? 7 : 8 - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysUntilMonday);
  return d;
}

export function msUntilNextWeek(from = new Date()) {
  return Math.max(0, startOfNextWeek(from).getTime() - from.getTime());
}

export function formatCountdown(ms, t) {
  const totalMin = Math.floor(ms / 60000);
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  const minutes = totalMin % 60;
  const parts = [];
  if (days > 0) parts.push(`${days} ${t("days")}`);
  if (hours > 0 || days > 0) parts.push(`${hours} ${t("hours")}`);
  parts.push(`${minutes} ${t("minutes")}`);
  return parts.join(" · ");
}

/** Pick current disease: newest releaseDate that is <= today; else first. */
export function pickCurrentDisease(list, now = new Date()) {
  const sorted = [...list].sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );
  const today = now.getTime();
  return (
    sorted.find((d) => new Date(d.releaseDate).getTime() <= today) || sorted[0]
  );
}

export function previousDiseases(list, currentId) {
  return [...list]
    .filter((d) => d.id !== currentId)
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
}
