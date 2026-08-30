/**
 * Synthesizes an authentic temple bell (Ghanta) chime using Web Audio API.
 * Pure native browser audio with no external MP3 dependencies.
 */
export function playTempleBell() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Harmonic frequencies typical of a bronze temple bell
    const frequencies = [587.33, 880, 1174.66, 1760, 2349.32]; // D5, A5, D6, A6, D7
    const gains = [0.4, 0.25, 0.15, 0.08, 0.04];
    const decays = [2.2, 1.8, 1.4, 0.9, 0.6];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      // slight shimmer frequency decay
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + decays[i]);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gains[i], now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[i] + 0.1);
    });
  } catch (e) {
    console.debug("Audio playback ignored:", e);
  }
}
