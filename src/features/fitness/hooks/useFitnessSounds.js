import { useCallback, useState } from "react";
import { loadSoundEnabled, saveSoundEnabled } from "../utils/storage.js";
import { fitnessSounds } from "../utils/sounds.js";

export function useFitnessSounds() {
  const [soundOn, setSoundOn] = useState(() => loadSoundEnabled());

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      saveSoundEnabled(next);
      if (next) fitnessSounds.click();
      return next;
    });
  }, []);

  const play = useCallback(
    (name) => {
      if (!soundOn || !fitnessSounds[name]) return;
      fitnessSounds[name]();
    },
    [soundOn]
  );

  const click = useCallback(() => play("click"), [play]);

  return { soundOn, toggleSound, play, click };
}
