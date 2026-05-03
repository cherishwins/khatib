import type { Locale } from './tokens';
import en from '@/content/translations/en.json';
import ar from '@/content/translations/ar.json';

const dictionaries = { en, ar } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function altPath(path: string, current: Locale): string {
  // /about → /ar/about (or vice versa). Returns path in the OTHER locale.
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  const normalized = stripped === '' ? '/' : stripped;
  if (current === 'en') return normalized === '/' ? '/ar' : `/ar${normalized}`;
  return normalized;
}

export function localizedPath(path: string, locale: Locale): string {
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  const normalized = stripped === '' ? '/' : stripped;
  if (locale === 'en') return normalized;
  return normalized === '/' ? '/ar' : `/ar${normalized}`;
}
