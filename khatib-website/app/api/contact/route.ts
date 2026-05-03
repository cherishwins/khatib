import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const Schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  topic: z.enum(['structural', 'geotechnical', 'forensic', 'patent', 'academic', 'other']),
  message: z.string().min(1).max(4000),
  locale: z.enum(['en', 'ar']),
  // Honeypot — bots fill every input; humans never see this field. Reject if present.
  company: z.string().max(200).optional(),
});

// Per-instance rate limiter. Honest about its limit: only one Fluid Compute instance
// sees a given submitter, so bursts across regions/instances aren't accounted for.
// Sufficient as a first line; upgrade to Vercel KV / Upstash Redis when traffic
// justifies cross-instance accounting.
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 3 };
const submissions = new Map<string, number[]>();

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;
  const recent = (submissions.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= RATE_LIMIT.max) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  // Opportunistic cleanup so the map doesn't grow unbounded across long-lived instances.
  if (submissions.size > 1000) {
    for (const [k, v] of submissions) {
      const kept = v.filter((t) => t > cutoff);
      if (kept.length === 0) submissions.delete(k);
      else submissions.set(k, kept);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
  }

  let parsed: z.infer<typeof Schema>;
  try {
    parsed = Schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
  }

  // Honeypot tripped — silently accept so the bot has no signal to retry.
  if (parsed.company && parsed.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // No key configured in dev — log and accept so the form is testable.
  if (!apiKey) {
    console.info('[contact] would send (no RESEND_API_KEY):', parsed);
    return NextResponse.json({ ok: true });
  }

  const subject = `[Khatib · ${parsed.topic}] ${parsed.name}`;
  const body =
    `Topic: ${parsed.topic}\n` +
    `From: ${parsed.name} <${parsed.email}>\n` +
    `Locale: ${parsed.locale}\n\n${parsed.message}\n`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Khatib Contact Form <noreply@miladkhatib.com>',
        to: 'milad@miladkhatib.com',
        reply_to: parsed.email,
        subject,
        text: body,
      }),
    });
    if (!res.ok) {
      console.error('[contact] resend rejected', await res.text());
      return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send error', err);
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 });
  }
}
