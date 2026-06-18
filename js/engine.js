import { state } from "./state.js";
import { updateWorld } from "./map.js";

function setPuppyMood(mood) {
  state.puppy.mood = mood;
}

export async function handleEvent(event) {
  if (event.type !== "ACTIVITY") return;

  const walkKm = event.walkKm || 0;
  const cycleKm = event.cycleKm || 0;

  const totalKm = walkKm + cycleKm;

  // 🌍 WORLD
  updateWorld(totalKm);

  // 🐶 PUPPY (simple rules only)
  if (cycleKm > walkKm) {
    setPuppyMood("EXCITED");
  } else if (totalKm > 3) {
    setPuppyMood("HAPPY");
  } else {
    setPuppyMood("CALM");
  }

  // 💾 MEMORY
  state.memory.push({
    time: Date.now(),
    distance: totalKm
  });
}
