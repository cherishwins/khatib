import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { GoldRule, Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import { TimelineRow } from './cards';
import { timeline } from '@/content/timeline';

export function AboutPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';

  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="01"
            eyebrow={isAr ? 'نبذة' : 'About'}
            title={dict.about.title}
            lede={dict.about.lede}
          />
        </div>
      </header>

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-2xl font-semibold text-cream md:text-3xl">
            {dict.about.section1Title}
          </h2>
          <div className="flex flex-col gap-6 text-base leading-relaxed text-warm-gray md:text-lg">
            {dict.about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <GoldRule className="mx-auto max-w-5xl" />

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 font-display text-2xl font-semibold text-cream md:text-3xl">
            {dict.about.section2Title}
          </h2>
          <div className="flex flex-col">
            {timeline.map((entry) => (
              <TimelineRow
                key={`${entry.year}-${entry.institution}`}
                year={entry.year}
                role={isAr ? entry.role_ar : entry.role_en}
                institution={entry.institution}
                description={isAr ? entry.description_ar : entry.description_en}
              />
            ))}
          </div>
        </div>
      </section>

      <GoldRule className="mx-auto max-w-5xl" />

      <section className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          <div>
            <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
              {dict.about.languagesLabel}
            </Mono>
            <ul className="flex flex-col gap-2 text-sm text-warm-gray">
              {dict.about.languages.map((l) => (
                <li key={l.name}>
                  <span className="text-cream">{l.name}</span> · {l.level}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
              {dict.about.softwareLabel}
            </Mono>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-warm-gray">
              {dict.about.software.map((s) => (
                <li key={s} className="font-mono">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
              {dict.about.membershipsLabel}
            </Mono>
            <ul className="flex flex-col gap-2 text-sm text-warm-gray">
              {dict.about.memberships.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}
