// Khatib Studio — magic-link auth.
//
// Two HMAC-signed tokens:
//   • magic-link token (15-min TTL) sent by email; verified once on click → sets session
//   • session cookie (7-day TTL) HMAC-signed; verified on every gated request
//
// No DB. Allowlist-gated; non-allowlisted addresses get silent success on /api/studio/login
// so the endpoint can't be used to enumerate authorised accounts.

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'studio_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.STUDIO_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('STUDIO_SESSION_SECRET missing or too short (need >=32 chars)');
  }
  return secret;
}

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Buffer {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(s.length + ((4 - (s.length % 4)) % 4), '=');
  return Buffer.from(padded, 'base64');
}

function sign(payload: string): string {
  return b64url(createHmac('sha256', getSecret()).update(payload).digest());
}

function verifySig(payload: string, sig: string): boolean {
  const expected = new Uint8Array(createHmac('sha256', getSecret()).update(payload).digest());
  let provided: Uint8Array;
  try {
    provided = new Uint8Array(fromB64url(sig));
  } catch {
    return false;
  }
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}

export function isAllowed(email: string): boolean {
  const list = (process.env.STUDIO_ALLOWLIST ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

type TokenKind = 'magic' | 'session';

interface TokenPayload {
  email: string;
  exp: number;
  kind: TokenKind;
}

function encodeToken(payload: TokenPayload): string {
  const body = b64url(Buffer.from(JSON.stringify(payload)));
  return `${body}.${sign(body)}`;
}

function decodeToken(token: string, expectedKind: TokenKind): { ok: true; email: string } | { ok: false; reason: string } {
  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'malformed' };
  const [body, sig] = parts;
  if (!verifySig(body, sig)) return { ok: false, reason: 'bad-signature' };
  let parsed: TokenPayload;
  try {
    parsed = JSON.parse(fromB64url(body).toString('utf8'));
  } catch {
    return { ok: false, reason: 'bad-payload' };
  }
  if (parsed.kind !== expectedKind) return { ok: false, reason: 'wrong-kind' };
  if (Date.now() > parsed.exp) return { ok: false, reason: 'expired' };
  if (!isAllowed(parsed.email)) return { ok: false, reason: 'not-allowed' };
  return { ok: true, email: parsed.email };
}

export function createMagicToken(email: string): string {
  return encodeToken({ email: email.toLowerCase(), exp: Date.now() + MAGIC_LINK_TTL_MS, kind: 'magic' });
}

export function verifyMagicToken(token: string) {
  return decodeToken(token, 'magic');
}

export function setSessionCookie(email: string): void {
  cookies().set(COOKIE_NAME, encodeToken({ email: email.toLowerCase(), exp: Date.now() + SESSION_TTL_MS, kind: 'session' }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie(): void {
  cookies().set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export function currentSession(): { email: string } | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const result = decodeToken(raw, 'session');
  return result.ok ? { email: result.email } : null;
}

export function requireSession(): { email: string } {
  const s = currentSession();
  if (!s) redirect('/studio/login');
  return s;
}
