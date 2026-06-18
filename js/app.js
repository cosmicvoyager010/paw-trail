import { state } from "./state.js";
import { handleEvent } from "./engine.js";

import {
  session,
  startWalk as beginWalk,
  addStep as recordStep,
  endWalk as finishWalk
} from "./session.js";

function renderMap() {
  const el = document.getElementById("mapList");

  if (!el || !state.world?.zones) return;

  el.innerHTML = Object.entries(state.world.zones)
    .map(([name, zone]) =>
      `<li>${zone.unlocked ? "🌿" : "🔒"} ${name}</li>`
    )
    .join("");
}

function renderPuppy() {
  const homePuppy = document.getElementById("homePuppy");
  const walkPuppy = document.getElementById("walkPuppy");

  let emoji = "🐶";

  switch (state.puppy.mood) {
    case "HAPPY":
      emoji = "🐶✨";
      break;

    case "EXCITED":
      emoji = "🐶⚡";
      break;

    case "JOYFUL":
      emoji = "🐶✨";
      break;

    case "PLAYFUL":
      emoji = "🐶🎾";
      break;

    case "CURIOUS":
      emoji = "🐶❓";
      break;

    case "TIRED":
      emoji = "🐶😴";
      break;

    default:
      emoji = "🐶";
  }

  if (homePuppy) homePuppy.textContent = emoji;
  if (walkPuppy) walkPuppy.textContent = emoji;
}

function renderAll() {
  renderPuppy();
  renderMap();
}

window.showScreen = function (id) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
  });

  const next = document.getElementById(id);

  if (next) {
    next.classList.add("active");
  }

  if (id === "map") {
    renderMap();
  }
};

window.refreshUI = renderAll;

/* -------------------------
   TEST WALK MODE
-------------------------- */

window.startWalk = function () {
  beginWalk();

  const meta = document.getElementById("walkMeta");

  if (meta) {
    meta.textContent = "Steps: 0 • Distance: 0.000 km";
  }

  window.showScreen("walk");
};

window.addStep = function () {
  recordStep();

  const meta = document.getElementById("walkMeta");

  if (meta) {
    meta.textContent =
      `Steps: ${session.steps} • Distance: ${session.distance.toFixed(3)} km`;
  }
};

window.endWalk = async function () {
  const summary = finishWalk();

  if (!summary) return;

  await handleEvent({
    type: "ACTIVITY",
    walkKm: summary.distance,
    cycleKm: 0
  });

  renderAll();

  window.showScreen("home");
};

/* -------------------------
   ACTIVITY IMPORT
-------------------------- */

window.submitActivity = async function () {
  const input = document.getElementById("activityInput");

  if (!input) {
    alert("activityInput element not found");
    return;
  }

  try {
    const data = JSON.parse(input.value);

    await handleEvent(data);

    renderAll();

    input.value = "";

    alert("Activity imported successfully!");
  } catch (err) {
    console.error(err);
    alert("Invalid JSON");
  }
};

window.addEventListener("load", () => {
  renderAll();
});
