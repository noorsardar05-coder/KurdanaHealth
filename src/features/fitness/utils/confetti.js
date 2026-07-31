const COLORS = ["#4a7c6f", "#7cb89a", "#f4a261", "#e9c46a", "#e76f51", "#a8dadc", "#cdb4db"];

export function burstConfetti(target, intensity = "medium") {
  const root = target || document.body;
  const count = intensity === "large" ? 70 : intensity === "small" ? 18 : 40;
  const container = document.createElement("div");
  container.className = "ft-confetti-layer";
  container.setAttribute("aria-hidden", "true");
  root.appendChild(container);

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "ft-confetti-piece";
    piece.style.setProperty("--c", COLORS[i % COLORS.length]);
    piece.style.setProperty("--x", `${Math.random() * 100}%`);
    piece.style.setProperty("--r", `${Math.random() * 360}deg`);
    piece.style.setProperty("--d", `${2 + Math.random() * 2}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.4}s`);
    piece.style.setProperty("--size", `${6 + Math.random() * 8}px`);
    container.appendChild(piece);
  }

  window.setTimeout(() => container.remove(), 3500);
}
