/**
 * Soft spoken voice for companion lines — never required, always optional.
 */
export function speakSoft(text, lang = "en") {
  try {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || "").slice(0, 280));
    u.rate = 0.92;
    u.pitch = 1.02;
    u.volume = 0.85;
    u.lang = lang === "ku" ? "ckb-IQ" : "en-US";
    window.speechSynthesis.speak(u);
  } catch {
    /* offline / unsupported */
  }
}

export function stopSpeaking() {
  try {
    window.speechSynthesis?.cancel();
  } catch {
    /* ignore */
  }
}
