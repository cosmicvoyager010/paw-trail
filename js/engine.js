import { state } from "./state.js";
import { updateWorld } from "./map.js";

function setPuppyMood(mood) {
  state.puppy.mood = mood;
}

export async function handleEvent(event) {
  if (!event || event.type !== "ACTIVITY") {
    return;
  }

  const walkKm = Number(event.walkKm || 0);
  const cycleKm = Number(event.cycleKm || 0);

  const totalKm = walkKm + cycleKm;

  if (totalKm <= 0) {
    return;
  }

  // 🌍 Update world progression
  updateWorld(totalKm);

  // 🐶 Puppy mood
  if (cycleKm > walkKm) {
    setPuppyMood("EXCITED");
  } else if (totalKm >= 3) {
    setPuppyMood("HAPPY");
  } else {
    setPuppyMood("CALM");
  }

  // ❤️ Bond grows slowly
  state.puppy.bond = Math.min(
    100,
    state.puppy.bond + totalKm * 0.5
  );

  // 💾 Memory
  state.memory.push({
    timestamp: Date.now(),
    walkKm,
    cycleKm,
    totalKm,
    puppyMood: state.puppy.mood
  });

  return true;
}
