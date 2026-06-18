import { state } from "./state.js";

export function updateWorld(distanceKm) {
  const distance = Number(distanceKm || 0);

  if (distance <= 0) {
    return;
  }

  state.world.totalKm += distance;

  const km = state.world.totalKm;

  // Zone unlocks
  state.world.zones.home.unlocked = true;

  if (km >= 1) {
    state.world.zones.park.unlocked = true;
  }

  if (km >= 5) {
    state.world.zones.forest.unlocked = true;
  }

  if (km >= 10) {
    state.world.zones.river.unlocked = true;
  }
}

export function getUnlockedZones() {
  return Object.entries(state.world.zones)
    .filter(([, zone]) => zone.unlocked)
    .map(([name]) => name);
}

export function getWorldProgress() {
  return {
    totalKm: state.world.totalKm,
    zones: state.world.zones
  };
}
