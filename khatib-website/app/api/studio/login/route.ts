import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createMagicToken, isAllowed } from '@/lib/studio/auth';
import { sendMagicLink } from '@/lib/studio/mail';
import { clientIp, rateLimited } from '@/lib/studio/rate-limit';
import { brand } from '@/lib/tokens';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Schema = z.object({ email: z.string().email().max(200) });

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited('studio-login', ip, { windowMs: 10 * 60 * 1000, max: 5 })) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  let parsed: { email: string };
  try {
    parsed = Schema.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Always return success — never disclose whether an address is allowlisted.
  if (!isAllowed(parsed.email)) {
    console.info('[studio] login attempt for non-allowlisted email:', parsed.email);
    return NextResponse.json({ ok: true });
  }

  const token = createMagicToken(parsed.email);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;
  const link = `${origin}/api/studio/auth?token=${encodeURIComponent(token)}`;
  await sendMagicLink(parsed.email, link);
  return NextResponse.json({ ok: true });
}
