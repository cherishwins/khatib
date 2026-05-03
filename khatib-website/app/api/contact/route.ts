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
});

export async function POST(request: Request) {
  let parsed: z.infer<typeof Schema>;
  try {
    parsed = Schema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 });
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
