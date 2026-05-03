// Reduced-motion preference + soft thunk on Seal & Export.
//
// Web Audio: lazy-creates a single AudioContext on first user interaction.
// All motion+sound is gated by prefers-reduced-motion to honour the OS setting.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export function playSealSound(): void {
  if (prefersReducedMotion()) return;
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;

  // Two-layer thunk: low body + brief click attack. Almost imperceptible — the tactile
  // signal that the letter is sealed.
  const body = c.createOscillator();
  body.type = 'sine';
  body.frequency.setValueAtTime(96, now);
  body.frequency.exponentialRampToValueAtTime(72, now + 0.18);
  const bodyGain = c.createGain();
  bodyGain.gain.setValueAtTime(0, now);
  bodyGain.gain.linearRampToValueAtTime(0.16, now + 0.012);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  body.connect(bodyGain).connect(c.destination);
  body.start(now);
  body.stop(now + 0.24);

  const click = c.createOscillator();
  click.type = 'triangle';
  click.frequency.setValueAtTime(420, now);
  click.frequency.exponentialRampToValueAtTime(180, now + 0.04);
  const clickGain = c.createGain();
  clickGain.gain.setValueAtTime(0, now);
  clickGain.gain.linearRampToValueAtTime(0.04, now + 0.005);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  click.connect(clickGain).connect(c.destination);
  click.start(now);
  click.stop(now + 0.07);
}

// Beirut-pinned greeting. Uses Intl so it's correct regardless of where the SSR happens.
export function beirutGreeting(now: Date = new Date()): string {
  const hourStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Beirut',
    hour: 'numeric',
    hour12: false,
  }).format(now);
  const h = Number.parseInt(hourStr, 10);
  if (h < 12) return 'GOOD MORNING, BEIRUT';
  if (h < 18) return 'GOOD AFTERNOON, BEIRUT';
  return 'GOOD EVENING, BEIRUT';
}
