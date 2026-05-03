'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { altPath } from '@/lib/i18n';

export function LanguageToggle({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname() ?? '/';
  const target = altPath(pathname, locale);
  return (
    <Link
      href={target}
      className="font-mono text-[11px] uppercase tracking-tracked text-gold underline-offset-4 hover:underline"
      hrefLang={locale === 'en' ? 'ar' : 'en'}
    >
      {dict.nav.languageToggle}
    </Link>
  );
}
