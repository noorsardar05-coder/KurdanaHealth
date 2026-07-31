/**
 * Procedural ambient audio via Web Audio API.
 * Infinite, calm loops — no external audio files required.
 */

function makeNoiseBuffer(ctx, seconds = 2) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function connectChain(nodes) {
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]);
}

export class AmbientEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.nodes = [];
    this.timers = [];
    this.playing = false;
    this.soundId = null;
    this.volume = 0.55;
  }

  async ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
    return this.ctx;
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.master) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(this.volume, now + 0.12);
    }
  }

  stop() {
    this.timers.forEach((id) => clearInterval(id));
    this.timers = [];
    this.nodes.forEach((n) => {
      try {
        n.stop?.();
      } catch {
        /* already stopped */
      }
      try {
        n.disconnect?.();
      } catch {
        /* ignore */
      }
    });
    this.nodes = [];
    this.playing = false;
    this.soundId = null;
  }

  track(...nodes) {
    this.nodes.push(...nodes);
    return nodes;
  }

  async play(soundId) {
    await this.ensure();
    this.stop();
    this.playing = true;
    this.soundId = soundId;
    const builders = {
      rain: () => this.#rain(),
      forest: () => this.#forest(),
      ocean: () => this.#ocean(),
      whiteNoise: () => this.#whiteNoise(),
      lofi: () => this.#lofi(),
      nature: () => this.#nature(),
      meditation: () => this.#meditation(),
      fireplace: () => this.#fireplace(),
      cats: () => this.#softPurr(),
      dogs: () => this.#softBreath(),
      clouds: () => this.#windSoft(),
      capybara: () => this.#softBreath(),
    };
    (builders[soundId] || builders.whiteNoise)();
  }

  #filteredNoise({ type = "lowpass", freq = 800, q = 0.7, gain = 0.15, band }) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = makeNoiseBuffer(ctx, 3);
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = gain;
    const chain = [src, filter];
    if (band) {
      const b = ctx.createBiquadFilter();
      b.type = "bandpass";
      b.frequency.value = band.freq;
      b.Q.value = band.q || 1;
      chain.push(b);
    }
    chain.push(g, this.master);
    connectChain(chain);
    src.start();
    this.track(src, filter, g);
    return { src, filter, g };
  }

  #drone(freq, gain = 0.04, type = "sine") {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = gain;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08 + Math.random() * 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = gain * 0.35;
    lfo.connect(lfoGain);
    lfoGain.connect(g.gain);
    osc.connect(g);
    g.connect(this.master);
    osc.start();
    lfo.start();
    this.track(osc, g, lfo, lfoGain);
  }

  #rain() {
    this.#filteredNoise({ type: "lowpass", freq: 1400, q: 0.5, gain: 0.22 });
    this.#filteredNoise({ type: "bandpass", freq: 2200, q: 0.8, gain: 0.08 });
    // soft drops
    const id = setInterval(() => {
      if (!this.playing) return;
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.frequency.value = 1800 + Math.random() * 2200;
      g.gain.value = 0.012;
      osc.connect(g);
      g.connect(this.master);
      const t = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.1);
    }, 180);
    this.timers.push(id);
  }

  #ocean() {
    const n = this.#filteredNoise({ type: "lowpass", freq: 480, q: 0.6, gain: 0.18 });
    const lfo = this.ctx.createOscillator();
    const lfoG = this.ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoG.gain.value = 0.12;
    lfo.connect(lfoG);
    lfoG.connect(n.g.gain);
    lfo.start();
    this.track(lfo, lfoG);
    this.#drone(55, 0.03, "sine");
  }

  #forest() {
    this.#filteredNoise({ type: "bandpass", freq: 1800, q: 1.2, gain: 0.06 });
    this.#filteredNoise({ type: "lowpass", freq: 600, q: 0.5, gain: 0.08 });
    this.#drone(110, 0.02);
    const id = setInterval(() => {
      if (!this.playing || Math.random() > 0.35) return;
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 2400 + Math.random() * 1800;
      g.gain.value = 0.01;
      osc.connect(g);
      g.connect(this.master);
      const t = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(osc.frequency.value * 1.2, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.28);
    }, 900);
    this.timers.push(id);
  }

  #whiteNoise() {
    this.#filteredNoise({ type: "lowpass", freq: 3200, q: 0.4, gain: 0.16 });
  }

  #nature() {
    this.#forest();
    this.#drone(82, 0.018);
  }

  #meditation() {
    this.#drone(110, 0.045);
    this.#drone(165, 0.028);
    this.#drone(220, 0.018);
    this.#filteredNoise({ type: "lowpass", freq: 300, q: 0.5, gain: 0.04 });
  }

  #lofi() {
    this.#drone(98, 0.035, "triangle");
    this.#drone(147, 0.02, "sine");
    this.#filteredNoise({ type: "lowpass", freq: 900, q: 0.7, gain: 0.05 });
    // soft vinyl crackle
    const id = setInterval(() => {
      if (!this.playing || Math.random() > 0.4) return;
      const ctx = this.ctx;
      const src = ctx.createBufferSource();
      src.buffer = makeNoiseBuffer(ctx, 0.05);
      const g = ctx.createGain();
      g.gain.value = 0.03;
      const f = ctx.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = 2500;
      src.connect(f);
      f.connect(g);
      g.connect(this.master);
      src.start();
      this.track(src, g, f);
    }, 420);
    this.timers.push(id);
  }

  #fireplace() {
    this.#filteredNoise({ type: "lowpass", freq: 500, q: 0.8, gain: 0.1 });
    this.#drone(70, 0.025, "sawtooth");
    const id = setInterval(() => {
      if (!this.playing) return;
      const ctx = this.ctx;
      const src = ctx.createBufferSource();
      src.buffer = makeNoiseBuffer(ctx, 0.08);
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 600 + Math.random() * 1400;
      f.Q.value = 2;
      const g = ctx.createGain();
      g.gain.value = 0.04 + Math.random() * 0.04;
      src.connect(f);
      f.connect(g);
      g.connect(this.master);
      const t = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      src.start(t);
      src.stop(t + 0.13);
    }, 140);
    this.timers.push(id);
  }

  #softPurr() {
    this.#drone(45, 0.05, "sine");
    this.#drone(90, 0.03, "triangle");
    this.#filteredNoise({ type: "lowpass", freq: 200, q: 1, gain: 0.05 });
  }

  #softBreath() {
    const n = this.#filteredNoise({ type: "lowpass", freq: 350, q: 0.6, gain: 0.08 });
    const lfo = this.ctx.createOscillator();
    const lfoG = this.ctx.createGain();
    lfo.frequency.value = 0.12;
    lfoG.gain.value = 0.06;
    lfo.connect(lfoG);
    lfoG.connect(n.g.gain);
    lfo.start();
    this.track(lfo, lfoG);
  }

  #windSoft() {
    const n = this.#filteredNoise({ type: "lowpass", freq: 700, q: 0.5, gain: 0.1 });
    const lfo = this.ctx.createOscillator();
    const lfoG = this.ctx.createGain();
    lfo.frequency.value = 0.05;
    lfoG.gain.value = 0.07;
    lfo.connect(lfoG);
    lfoG.connect(n.g.gain);
    lfo.start();
    this.track(lfo, lfoG);
  }

  dispose() {
    this.stop();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
      this.master = null;
    }
  }
}

let sharedEngine = null;
export function getAmbientEngine() {
  if (!sharedEngine) sharedEngine = new AmbientEngine();
  return sharedEngine;
}
