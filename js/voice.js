export function speak(text, options = {}) {
  if (!("speechSynthesis" in window) || !text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 0.92;
  utterance.pitch = options.pitch ?? 1.0;
  utterance.volume = options.volume ?? 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
