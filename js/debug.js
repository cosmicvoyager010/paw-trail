import { session } from "./session.js";
import { state } from "./state.js";
import { getAllMemories } from "./memory-db.js";

let debugOpen = false;
let timerId = null;

async function renderDebug() {
  const memories = await getAllMemories();
  const latest = memories[memories.length - 1];

  const gapHours = latest
    ? ((Date.now() - latest.timestamp) / (1000 * 60 * 60)).toFixed(1)
    : "n/a";

  const html = `
    <p>🚶 Steps: ${session.steps}</p>
    <p>📏 Distance: ${session.distance.toFixed(3)} km</p>
    <p>⏱ Active: ${session.active ? "yes" : "no"}</p>
    <hr>
    <p>🌍 World: ${state.worldMood}</p>
    <p>🐶 Mood: ${state.puppy.mood}</p>
    <p>💖 Bond: ${state.puppy.bond.toFixed(2)}</p>
    <p>⚡ Energy: ${state.puppy.energy.toFixed(2)}</p>
    <hr>
    <p>💾 Memories: ${memories.length}</p>
    <p>🌙 Last visit: ${gapHours}h ago</p>
  `;

  const el = document.getElementById("debugContent");
  if (el) el.innerHTML = html;
}

export function toggleDebug() {
  const panel = document.getElementById("debugPanel");
  if (!panel) return;

  debugOpen = !debugOpen;
  panel.classList.toggle("hidden", !debugOpen);

  if (debugOpen) {
    renderDebug();
    if (!timerId) {
      timerId = window.setInterval(renderDebug, 500);
    }
  } else if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

window.toggleDebug = toggleDebug;
