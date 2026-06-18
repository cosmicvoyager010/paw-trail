import { state } from "./state.js";

let debugOpen = false;

function renderDebug() {
  const unlockedZones = Object.entries(state.world.zones)
    .filter(([, zone]) => zone.unlocked)
    .map(([name]) => name)
    .join(", ");

  const html = `
    <p>🗺️ Total Distance: ${state.world.totalKm.toFixed(2)} km</p>
    <p>🐶 Mood: ${state.puppy.mood}</p>
    <p>💖 Bond: ${state.puppy.bond.toFixed(1)}</p>
    <hr>
    <p>🌿 Zones: ${unlockedZones || "home"}</p>
    <p>💾 Memories: ${state.memory.length}</p>
  `;

  const el = document.getElementById("debugContent");

  if (el) {
    el.innerHTML = html;
  }
}

export function toggleDebug() {
  const panel = document.getElementById("debugPanel");

  if (!panel) return;

  debugOpen = !debugOpen;

  panel.classList.toggle("hidden", !debugOpen);

  if (debugOpen) {
    renderDebug();
  }
}

window.toggleDebug = toggleDebug;
