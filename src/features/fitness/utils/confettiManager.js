import { burstConfetti } from "./confetti.js";

export function fireConfetti(target, intensity = "medium") {
  burstConfetti(target, intensity);
}

export function confettiSmall(target) {
  fireConfetti(target, "small");
}

export function confettiLarge(target) {
  fireConfetti(target, "large");
}
