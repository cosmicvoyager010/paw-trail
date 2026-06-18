export const session = {
  active: false,
  steps: 0,
  distance: 0,
  startTime: null
};

export function startWalk() {
  session.active = true;
  session.steps = 0;
  session.distance = 0;
  session.startTime = Date.now();
}

export function addStep() {
  if (!session.active) return;

  session.steps += 1;
  session.distance += 0.0008; // approx. 0.8 m per step
}

export function endWalk() {
  if (!session.active) return null;

  const summary = {
    steps: session.steps,
    distance: session.distance,
    durationMs: Date.now() - session.startTime,
    startTime: session.startTime,
    endTime: Date.now()
  };

  session.active = false;
  session.startTime = null;

  return summary;
}
