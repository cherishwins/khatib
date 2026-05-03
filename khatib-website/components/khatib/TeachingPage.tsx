import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import { teaching } from '@/content/teaching';

export function TeachingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'التدريس' : 'Teaching'}
            title={dict.teaching.title}
            lede={dict.teaching.lede}
          />
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-3 border-b border-gold/30 pb-3 font-mono text-[11px] uppercase tracking-tracked text-gold md:grid-cols-[2fr_1fr_3fr]">
            <span>{dict.teaching.columns.institution}</span>
            <span>{dict.teaching.columns.period}</span>
            <span>{dict.teaching.columns.courses}</span>
          </div>
          <ul className="flex flex-col">
            {teaching.map((post) => (
              <li
                key={post.institution}
                className="grid gap-3 border-b border-warm-gray/15 py-6 md:grid-cols-[2fr_1fr_3fr] md:gap-6"
              >
                <span className="font-display text-lg font-semibold text-cream md:text-xl">
                  {post.institution}
                </span>
                <Mono className="text-xs uppercase tracking-tracked text-gold">{post.period}</Mono>
                <ul className="flex flex-col gap-1 text-sm text-warm-gray md:text-base">
                  {(isAr ? post.courses_ar : post.courses_en).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
