'use client';

import { useState } from 'react';
import { z } from 'zod';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';

const TopicEnum = z.enum(['structural', 'geotechnical', 'forensic', 'patent', 'academic', 'other']);

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  topic: TopicEnum,
  message: z.string().min(1).max(4000),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const candidate = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      topic: String(formData.get('topic') ?? ''),
      message: String(formData.get('message') ?? ''),
    };
    // Honeypot — humans never see/fill this field; bots fill every input.
    const honeypot = String(formData.get('company') ?? '');
    const parsed = ContactSchema.safeParse(candidate);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        const isEmpty = candidate[key] === '';
        fieldErrors[key] = isEmpty ? dict.contact.form.required : dict.contact.form.invalid;
      }
      setErrors(fieldErrors);
      setState('error');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, locale, company: honeypot }),
      });
      if (!res.ok) throw new Error('failed');
      form.reset();
      setState('success');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <p className="border border-green-light/40 bg-heritage-green/20 p-6 text-cream">
        {dict.contact.form.success}
      </p>
    );
  }

  const f = dict.contact.form;
  const topics = Object.entries(f.topicOptions) as Array<[keyof typeof f.topicOptions, string]>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {/* Honeypot — visually and semantically hidden; bots fill it, humans don't. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Field label={f.name} name="name" required error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-required="true"
          className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-base text-cream focus:border-gold"
        />
      </Field>
      <Field label={f.email} name="email" required error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-required="true"
          className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-base text-cream focus:border-gold"
        />
      </Field>
      <Field label={f.topic} name="topic" required error={errors.topic}>
        <select
          id="topic"
          name="topic"
          required
          aria-required="true"
          defaultValue=""
          className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-base text-cream focus:border-gold"
        >
          <option value="" disabled>
            —
          </option>
          {topics.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>
      <Field label={f.message} name="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-required="true"
          className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-base text-cream focus:border-gold"
        />
      </Field>
      {state === 'error' && (
        <p role="alert" className="text-sm text-danger">
          {f.error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="self-start border border-gold bg-gold/10 px-6 py-3 font-mono text-[11px] uppercase tracking-tracked text-gold hover:bg-gold hover:text-deep-navy disabled:opacity-50"
      >
        {state === 'submitting' ? (isAr ? 'جارٍ الإرسال…' : 'Sending…') : f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-mono text-[11px] uppercase tracking-tracked text-gold">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <Mono className="text-[10px] uppercase tracking-tracked text-danger">{error}</Mono>
      )}
    </div>
  );
}
