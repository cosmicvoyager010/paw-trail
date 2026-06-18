import { state } from "./state.js";

function renderMap() {
  const el = document.getElementById("mapList");
  if (!el) return;

  el.innerHTML = Object.entries(state.world.zones)
    .map(([name, zone]) =>
      `<li>${zone.unlocked ? "🌿" : "🔒"} ${name}</li>`
    )
    .join("");
}

function renderPuppy() {
  const el = document.getElementById("homePuppy");
  if (!el) return;

  const emoji =
    state.puppy.mood === "HAPPY"
      ? "🐶✨"
      : state.puppy.mood === "EXCITED"
      ? "🐶⚡"
      : "🐶";

  el.textContent = emoji;
}

window.showScreen = function (id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");

  if (id === "map") renderMap();
};

window.refreshUI = function () {
  renderPuppy();
  renderMap();
};
