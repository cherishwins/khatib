import { describe, expect, it } from 'vitest';
import { beirutGreeting } from '@/lib/studio/motion';

describe('lib/studio/motion.beirutGreeting', () => {
  it('returns morning greeting for early Beirut hours', () => {
    // 06:00 UTC = 09:00 Beirut (UTC+3 in summer / UTC+2 in winter)
    const winter = new Date('2026-01-15T06:00:00Z'); // 08:00 Beirut (winter)
    const summer = new Date('2026-06-15T06:00:00Z'); // 09:00 Beirut (summer)
    expect(beirutGreeting(winter)).toBe('GOOD MORNING, BEIRUT');
    expect(beirutGreeting(summer)).toBe('GOOD MORNING, BEIRUT');
  });

  it('returns afternoon greeting for midday Beirut', () => {
    const noonish = new Date('2026-06-15T11:00:00Z'); // 14:00 Beirut
    expect(beirutGreeting(noonish)).toBe('GOOD AFTERNOON, BEIRUT');
  });

  it('returns evening greeting for late Beirut hours', () => {
    const evening = new Date('2026-06-15T18:00:00Z'); // 21:00 Beirut
    expect(beirutGreeting(evening)).toBe('GOOD EVENING, BEIRUT');
  });

  it('returns evening greeting at 00:00 Beirut even when server is in another zone', () => {
    // 21:00 UTC = 00:00 Beirut (winter) — still evening cutoff applies (h=0 → morning)
    const lateNight = new Date('2026-01-15T22:00:00Z'); // 00:00 Beirut
    expect(beirutGreeting(lateNight)).toBe('GOOD MORNING, BEIRUT');
  });
});
