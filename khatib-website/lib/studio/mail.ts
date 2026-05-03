// Magic-link email — Resend transport. Falls back to console in dev when no key configured.

const FROM = process.env.RESEND_FROM ?? 'Khatib Studio <noreply@miladkhatib.com>';

export async function sendMagicLink(email: string, link: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[studio] no RESEND_API_KEY — magic link for', email, ':', link);
    return { ok: true };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: 'Sign in to Khatib Studio',
        text:
          `Sign in to Khatib Studio with this one-time link.\n\n` +
          `${link}\n\n` +
          `The link is valid for 15 minutes. If you did not request this, you can ignore this message.\n\n` +
          `— miladkhatib.com`,
      }),
    });
    if (!res.ok) {
      console.error('[studio] resend rejected', await res.text());
      return { ok: false, reason: 'send-failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[studio] mail error', err);
    return { ok: false, reason: 'network' };
  }
}
