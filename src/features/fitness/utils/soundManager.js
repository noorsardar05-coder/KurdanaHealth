import { fitnessSounds } from "./sounds.js";
import { loadSoundEnabled } from "./storage.js";

export const SoundManager = {
  isEnabled() {
    return loadSoundEnabled();
  },
  play(name) {
    if (!loadSoundEnabled()) return;
    fitnessSounds[name]?.();
  },
  click() {
    this.play("click");
  },
};
