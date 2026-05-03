'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';

const NAV_KEYS = ['about', 'services', 'patents', 'publications', 'editorial', 'speaking', 'contact'] as const;

export function MobileMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const prefix = locale === 'en' ? '' : '/ar';

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC closes; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close menu') : (locale === 'ar' ? 'فتح القائمة' : 'Open menu')}
        className="inline-flex h-10 w-10 items-center justify-center border border-warm-gray/30 text-cream hover:border-gold hover:text-gold md:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'ar' ? 'القائمة الرئيسية' : 'Primary navigation'}
          className="fixed inset-0 top-[57px] z-40 flex flex-col bg-deep-navy/98 backdrop-blur-md md:hidden"
        >
          {/* Click-outside dismissal: tapping the overlay (not links) closes. */}
          <button
            type="button"
            aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
            onClick={() => setOpen(false)}
            className="absolute inset-0 -z-10 cursor-default"
            tabIndex={-1}
          />
          <nav aria-label={locale === 'ar' ? 'القائمة الرئيسية' : 'Primary'} className="flex flex-col px-6 py-8">
            <ul className="flex flex-col gap-1 font-mono text-sm uppercase tracking-tracked text-cream">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={`${prefix}/${key}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-warm-gray/15 py-4 transition-colors hover:text-gold"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
