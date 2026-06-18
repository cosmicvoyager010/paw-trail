import { state } from "./state.js";
import { session } from "./session.js";
import { saveMemory } from "./memory-db.js";
import { setWorldMood } from "./world.js";
import { onWalkStart, onStep, onWalkEnd } from "./puppy.js";
import { speak } from "./voice.js";

function buildMemory(summary) {
  const steps = summary.steps || 0;
  const distance = summary.distance || 0;
  const durationMs = summary.durationMs || 0;
  const durationMin = Math.max(1, Math.round(durationMs / 60000));

  let title = "A walk together";
  if (distance >= 2) title = "The long walk";
  else if (steps >= 30) title = "A steady walk";
  else if (steps <= 5) title = "A short stroll";

  let text = "We walked together today.";
  if (distance >= 2) text = "We walked far together today.";
  else if (steps >= 30) text = "We found a calm rhythm together.";
  else if (steps <= 5) text = "It was a short, gentle walk.";

  return {
    id: undefined,
    timestamp: Date.now(),
    title,
    text,
    steps,
    distance,
    durationMs,
    durationMin,
    worldMood: state.worldMood,
    puppyMood: state.puppy.mood,
    bond: Number(state.puppy.bond.toFixed(2))
  };
}

export async function handleEvent(type, payload = {}) {
  if (type === "WALK_START") {
    setWorldMood("BRIGHT");
    onWalkStart();
    speak("Oh... we’re going.");
    return null;
  }

  if (type === "STEP") {
    onStep(session.steps);

    if (session.steps > 0 && session.steps % 10 === 0) {
      speak("Keep going. I’m right here.");
    }

    return null;
  }

  if (type === "WALK_END") {
    setWorldMood("CALM");
    onWalkEnd();
    speak("We’re back now.");

    const memory = buildMemory(payload);
    await saveMemory(memory);
    state.lastMemoryAt = memory.timestamp;

    return memory;
  }

  return null;
}
