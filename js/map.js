import { state } from "./state.js";

export function updateWorld(distanceKm) {
  state.world.totalKm += distanceKm;

  const km = state.world.totalKm;

  if (km > 1) state.world.zones.park.unlocked = true;
  if (km > 5) state.world.zones.forest.unlocked = true;
  if (km > 10) state.world.zones.river.unlocked = true;
}
