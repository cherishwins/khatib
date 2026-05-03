import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const ORIGINAL_ENV = { ...process.env };

beforeAll(() => {
  process.env.STUDIO_SESSION_SECRET = 'test_secret_test_secret_test_secret_test'; // 40 chars
  process.env.STUDIO_ALLOWLIST = 'milad@miladkhatib.com,jesse@example.com';
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

// Re-import after env is set so module-load reads the test secret.
async function loadAuth() {
  const mod = await import('@/lib/studio/auth');
  return mod;
}

describe('lib/studio/auth', () => {
  it('isAllowed accepts allowlisted emails case-insensitively', async () => {
    const { isAllowed } = await loadAuth();
    expect(isAllowed('milad@miladkhatib.com')).toBe(true);
    expect(isAllowed('MILAD@MiladKhatib.com')).toBe(true);
    expect(isAllowed('JESSE@example.com')).toBe(true);
  });

  it('isAllowed rejects non-allowlisted emails', async () => {
    const { isAllowed } = await loadAuth();
    expect(isAllowed('attacker@example.com')).toBe(false);
    expect(isAllowed('')).toBe(false);
  });

  it('createMagicToken → verifyMagicToken roundtrip succeeds', async () => {
    const { createMagicToken, verifyMagicToken } = await loadAuth();
    const token = createMagicToken('milad@miladkhatib.com');
    const result = verifyMagicToken(token);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.email).toBe('milad@miladkhatib.com');
    }
  });

  it('verifyMagicToken rejects malformed tokens', async () => {
    const { verifyMagicToken } = await loadAuth();
    expect(verifyMagicToken('').ok).toBe(false);
    expect(verifyMagicToken('not-a-token').ok).toBe(false);
    expect(verifyMagicToken('part1.part2.part3').ok).toBe(false);
  });

  it('verifyMagicToken rejects tampered signatures', async () => {
    const { createMagicToken, verifyMagicToken } = await loadAuth();
    const token = createMagicToken('milad@miladkhatib.com');
    const [body] = token.split('.');
    const tampered = `${body}.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    const result = verifyMagicToken(tampered);
    expect(result.ok).toBe(false);
  });

  it('verifyMagicToken rejects tampered payloads', async () => {
    const { createMagicToken, verifyMagicToken } = await loadAuth();
    const token = createMagicToken('milad@miladkhatib.com');
    const [, sig] = token.split('.');
    // Forge a payload claiming a different email; signature won't match.
    const forgedBody = Buffer.from(
      JSON.stringify({ email: 'attacker@example.com', exp: Date.now() + 60_000, kind: 'magic' }),
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    const result = verifyMagicToken(`${forgedBody}.${sig}`);
    expect(result.ok).toBe(false);
  });

  it('verifyMagicToken rejects expired tokens', async () => {
    const { createMagicToken, verifyMagicToken } = await loadAuth();
    const realDateNow = Date.now;
    Date.now = () => 1_000_000_000_000; // past
    const token = createMagicToken('milad@miladkhatib.com');
    Date.now = () => 1_000_000_000_000 + 16 * 60 * 1000; // 16 min later
    const result = verifyMagicToken(token);
    Date.now = realDateNow;
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('expired');
  });

  it('verifyMagicToken rejects tokens issued for non-allowlisted addresses', async () => {
    const { createMagicToken, verifyMagicToken } = await loadAuth();
    // Forge a token for an email not in the allowlist (using same secret).
    const stale = createMagicToken('milad@miladkhatib.com');
    process.env.STUDIO_ALLOWLIST = 'someone-else@example.com';
    // Re-import with new env via vitest's module resetting isn't trivial here;
    // since isAllowed reads env on each call, the same module sees the new list.
    const result = verifyMagicToken(stale);
    process.env.STUDIO_ALLOWLIST = 'milad@miladkhatib.com,jesse@example.com';
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('not-allowed');
  });

  it('verifyMagicToken refuses session-kind tokens (kind discrimination)', async () => {
    // Forge a token with kind='session' but signed correctly.
    const { verifyMagicToken } = await loadAuth();
    const { createHmac } = await import('node:crypto');
    const secret = process.env.STUDIO_SESSION_SECRET!;
    const body = Buffer.from(
      JSON.stringify({ email: 'milad@miladkhatib.com', exp: Date.now() + 60_000, kind: 'session' }),
    ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const sig = createHmac('sha256', secret).update(body).digest('base64')
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const result = verifyMagicToken(`${body}.${sig}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe('wrong-kind');
  });
});
