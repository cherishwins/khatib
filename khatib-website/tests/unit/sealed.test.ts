import { afterEach, beforeEach, describe, expect, it } from 'vitest';

// jsdom-like minimal localStorage mock for the sealed-document tests.
class MemoryStorage {
  store = new Map<string, string>();
  getItem(k: string) { return this.store.has(k) ? this.store.get(k)! : null; }
  setItem(k: string, v: string) { this.store.set(k, v); }
  removeItem(k: string) { this.store.delete(k); }
  clear() { this.store.clear(); }
  key(i: number) { return Array.from(this.store.keys())[i] ?? null; }
  get length() { return this.store.size; }
}

beforeEach(() => {
  const ls = new MemoryStorage();
  (globalThis as unknown as { window: { localStorage: MemoryStorage } }).window = { localStorage: ls };
  (globalThis as unknown as { localStorage: MemoryStorage }).localStorage = ls;
});

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
  delete (globalThis as { localStorage?: unknown }).localStorage;
});

// Each test's beforeEach swaps localStorage to a fresh MemoryStorage, and the sealed
// module reads window.localStorage on every call — so a single import is enough.
const sealedModule = import('@/lib/studio/sealed');
async function loadSealedModule() {
  return sealedModule;
}

describe('lib/studio/sealed', () => {
  it('records a sealed letter and reads it back', async () => {
    const { recordSealedLetter, loadSealed } = await loadSealedModule();
    const entry = recordSealedLetter('en', {
      ref: 'MK-2026-001',
      date: '03 May 2026',
      re: 'Forensic Opinion',
      salutation: 'Dear Counsel,',
      body: 'Three findings are material to your action.',
      signoff: '',
    });
    expect(entry.kind).toBe('letter');
    expect(entry.locale).toBe('en');
    const all = loadSealed();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(entry.id);
    if (all[0].kind === 'letter') {
      expect(all[0].payload.ref).toBe('MK-2026-001');
    }
  });

  it('records a sealed capability and discriminates from letters', async () => {
    const { recordSealedLetter, recordSealedCapability, loadSealed } = await loadSealedModule();
    recordSealedLetter('en', { ref: 'L1', date: 'd', re: 'r', salutation: 's', body: 'b', signoff: '' });
    recordSealedCapability('ar', {
      ref: 'MK-CS-2026-001',
      date: '03 أيار 2026',
      issuedTo: 'Lebanese Water Authority',
      engagementContext: 'Geotechnical tender',
      practiceIntro: 'الدكتور…',
      repWork: [],
      contactNote: '',
    });
    const all = loadSealed();
    expect(all).toHaveLength(2);
    // Most-recent first.
    expect(all[0].kind).toBe('capability');
    expect(all[1].kind).toBe('letter');
    if (all[0].kind === 'capability') {
      expect(all[0].payload.issuedTo).toBe('Lebanese Water Authority');
      expect(all[0].locale).toBe('ar');
    }
  });

  it('summarise produces correct subject for each kind', async () => {
    const { recordSealedLetter, recordSealedCapability, summarise, loadSealed } = await loadSealedModule();
    recordSealedLetter('en', { ref: 'L1', date: 'd', re: 'Forensic Opinion', salutation: 's', body: 'b', signoff: '' });
    recordSealedCapability('en', {
      ref: 'CS1', date: 'd', issuedTo: 'Beirut Authority', engagementContext: '', practiceIntro: '', repWork: [], contactNote: '',
    });
    const [cap, letter] = loadSealed();
    expect(summarise(cap).subject).toBe('Capability Statement: Beirut Authority');
    expect(summarise(letter).subject).toBe('Forensic Opinion');
  });

  it('deleteSealed removes a specific entry', async () => {
    const { recordSealedLetter, deleteSealed, loadSealed } = await loadSealedModule();
    const a = recordSealedLetter('en', { ref: 'A', date: 'd', re: 'A', salutation: '', body: '', signoff: '' });
    recordSealedLetter('en', { ref: 'B', date: 'd', re: 'B', salutation: '', body: '', signoff: '' });
    expect(loadSealed()).toHaveLength(2);
    deleteSealed(a.id);
    const remaining = loadSealed();
    expect(remaining).toHaveLength(1);
    if (remaining[0].kind === 'letter') {
      expect(remaining[0].payload.ref).toBe('B');
    }
  });
});
