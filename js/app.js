import { state } from "./state.js";
import { session, startWalk as beginWalk, addStep as recordStep, endWalk as finishWalk } from "./session.js";
import { handleEvent } from "./engine.js";
import { getAllMemories } from "./memory-db.js";
import { toggleDebug } from "./debug.js";
import { setWorldMood } from "./world.js";
import { setPuppyMood } from "./puppy.js";

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const next = document.getElementById(id);
  if (next) next.classList.add("active");
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function refreshWalkMeta() {
  setText(
    "walkMeta",
    `Steps: ${session.steps} • Distance: ${session.distance.toFixed(2)} km`
  );
}

async function refreshHome() {
  const memories = await getAllMemories();

  if (!memories.length) {
    setText("homeStatus", "Your puppy is resting.");
    setText("homeMeta", "No walks yet.");
    return;
  }

  const last = memories[memories.length - 1];
  const gapHours = (Date.now() - last.timestamp) / (1000 * 60 * 60);

  setText("homeStatus", "PawTrail remembers your walks.");
  setText(
    "homeMeta",
    gapHours < 1 ? "Last walk: just now." : `Last walk: ${gapHours.toFixed(1)} hours ago.`
  );
}

window.startWalk = async function startWalk() {
  showScreen("walk");
  beginWalk();
  await handleEvent("WALK_START");
  setText("walkStatus", "You and your puppy are walking.");
  refreshWalkMeta();
};

window.addStep = async function addStep() {
  if (!session.active) return;

  recordStep();
  await handleEvent("STEP");

  if (session.steps % 12 === 0) {
    setText("walkStatus", "The rhythm feels good.");
  } else {
    setText("walkStatus", "Walking...");
  }

  refreshWalkMeta();
};

window.endWalk = async function endWalk() {
  if (!session.active) return;

  const summary = finishWalk();
  setText("walkStatus", "Saving memory...");

  await handleEvent("WALK_END", summary);
  showScreen("home");
  await refreshHome();
};

window.toggleDebug = toggleDebug;

window.addEventListener("load", async () => {
  setWorldMood("CALM");
  setPuppyMood("RESTING");
  showScreen("home");
  await refreshHome();
  refreshWalkMeta();
});
