import { state } from "./state.js";

export function setWorldMood(mood) {
  state.worldMood = mood;
  document.body.dataset.mood = mood;
}

export function getWorldMood() {
  return state.worldMood;
}
