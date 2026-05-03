import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Wordmark } from './Wordmark';
import { LanguageToggle } from './LanguageToggle';
import { Monogram } from './Monogram';

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = locale === 'en' ? '/' : '/ar';
  const navItems = [
    { key: 'about', href: 'about' },
    { key: 'services', href: 'services' },
    { key: 'patents', href: 'patents' },
    { key: 'publications', href: 'publications' },
    { key: 'editorial', href: 'editorial' },
    { key: 'speaking', href: 'speaking' },
    { key: 'contact', href: 'contact' },
  ] as const;

  const prefix = locale === 'en' ? '' : '/ar';

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray/15 bg-deep-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <Link href={home} className="flex items-center gap-3" aria-label={dict.meta.shortName}>
          <Monogram size={36} ariaLabel={dict.meta.shortName} />
          <Wordmark lang={locale === 'en' ? 'en' : 'ar'} className="hidden md:inline-flex" />
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-tracked text-warm-gray">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={`${prefix}/${item.href}`}
                  className="transition-colors hover:text-gold"
                >
                  {dict.nav[item.key as keyof typeof dict.nav]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageToggle locale={locale} dict={dict} />
      </div>
    </header>
  );
}
