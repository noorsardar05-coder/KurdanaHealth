export function softHaptic() {
  try {
    if (navigator.vibrate) navigator.vibrate(12);
  } catch {
    /* ignore */
  }
}

export function calmHaptic() {
  try {
    if (navigator.vibrate) navigator.vibrate([18, 40, 18]);
  } catch {
    /* ignore */
  }
}

export function panicHaptic() {
  try {
    if (navigator.vibrate) navigator.vibrate([30, 60, 30, 60, 30]);
  } catch {
    /* ignore */
  }
}
