'use client';

import { useState } from 'react';

export function LoginForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setState('sending');
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    if (!email) {
      setErrorMessage('Please enter your email.');
      setState('error');
      return;
    }
    try {
      const res = await fetch('/api/studio/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.status === 429) {
        setErrorMessage('Too many sign-in attempts. Please try again in a few minutes.');
        setState('error');
        return;
      }
      if (!res.ok) {
        setErrorMessage('Could not send the sign-in link. Please try again.');
        setState('error');
        return;
      }
      setState('sent');
    } catch {
      setErrorMessage('Network error. Please try again.');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="border border-gold/40 bg-navy/40 p-6 text-cream">
        <p className="font-mono text-[11px] uppercase tracking-tracked text-gold">Check your inbox</p>
        <p className="mt-3 text-sm text-warm-gray">
          If your address is authorised for the studio, a one-time sign-in link is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-tracked text-gold">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        autoFocus
        className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-base text-cream focus:border-gold"
      />
      {errorMessage && (
        <p role="alert" className="font-mono text-[10px] uppercase tracking-tracked text-danger">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-2 self-start border border-gold bg-gold/10 px-6 py-3 font-mono text-[11px] uppercase tracking-tracked text-gold hover:bg-gold hover:text-deep-navy disabled:opacity-50"
      >
        {state === 'sending' ? 'Sending…' : 'Send sign-in link'}
      </button>
    </form>
  );
}
