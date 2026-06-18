import { state } from "./state.js";

const EMOJIS = {
  RESTING: "🐶",
  JOYFUL: "🐶✨",
  PLAYFUL: "🐶🎾",
  CURIOUS: "🐶❓",
  TIRED: "🐶😴"
};

function renderPuppyEmoji() {
  const emoji = EMOJIS[state.puppy.mood] || "🐶";
  document.querySelectorAll("#homePuppy, #walkPuppy").forEach((el) => {
    if (el) el.textContent = emoji;
  });
}

export function setPuppyMood(mood) {
  state.puppy.mood = mood;
  renderPuppyEmoji();
}

export function onWalkStart() {
  state.puppy.energy = Math.max(0, state.puppy.energy - 0.01);
  state.puppy.trust = Math.min(1, state.puppy.trust + 0.02);
  setPuppyMood("JOYFUL");
}

export function onStep(stepCount) {
  if (stepCount > 0 && stepCount % 12 === 0) {
    state.puppy.playfulness = Math.min(1, state.puppy.playfulness + 0.01);
    setPuppyMood("PLAYFUL");
  }

  if (stepCount > 0 && stepCount % 30 === 0) {
    setPuppyMood("CURIOUS");
  }
}

export function onWalkEnd() {
  state.puppy.energy = Math.min(1, state.puppy.energy + 0.12);
  state.puppy.bond = Math.min(1, state.puppy.bond + 0.03);
  setPuppyMood("RESTING");
}
