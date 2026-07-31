let ctx = null;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, duration = 0.15, type = "sine", vol = 0.12, delay = 0) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, c.currentTime + delay);
    gain.gain.linearRampToValueAtTime(vol, c.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration + 0.05);
  } catch {
    /* silent fail */
  }
}

export const fitnessSounds = {
  click: () => tone(520, 0.06, "sine", 0.08),
  startWorkout: () => {
    tone(440, 0.12, "sine", 0.1);
    tone(554, 0.12, "sine", 0.1, 0.1);
    tone(659, 0.18, "sine", 0.1, 0.2);
  },
  restStart: () => tone(330, 0.2, "triangle", 0.1),
  restEnd: () => {
    tone(523, 0.1, "sine", 0.1);
    tone(659, 0.15, "sine", 0.1, 0.12);
  },
  exerciseDone: () => {
    tone(587, 0.08, "sine", 0.09);
    tone(740, 0.12, "sine", 0.09, 0.08);
  },
  workoutComplete: () => {
    [440, 554, 659, 880].forEach((f, i) => tone(f, 0.14, "sine", 0.11, i * 0.1));
  },
  badge: () => {
    tone(784, 0.1, "sine", 0.1);
    tone(988, 0.15, "sine", 0.1, 0.1);
  },
};
