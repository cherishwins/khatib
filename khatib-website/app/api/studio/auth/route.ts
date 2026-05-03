import { NextResponse } from 'next/server';
import { setSessionCookie, verifyMagicToken } from '@/lib/studio/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/studio/login?error=missing-token', url));
  }
  const result = verifyMagicToken(token);
  if (!result.ok) {
    return NextResponse.redirect(new URL(`/studio/login?error=${result.reason}`, url));
  }
  setSessionCookie(result.email);
  return NextResponse.redirect(new URL('/studio', url));
}
