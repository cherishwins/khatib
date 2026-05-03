import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/studio/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  clearSessionCookie();
  return NextResponse.redirect(new URL('/studio/login', req.url), { status: 303 });
}
