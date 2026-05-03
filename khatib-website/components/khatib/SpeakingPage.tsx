import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import {
  SPEAKING_PENDING_NOTE_AR,
  SPEAKING_PENDING_NOTE_EN,
  talks,
} from '@/content/speaking';

export function SpeakingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'المحاضرات' : 'Speaking'}
            title={dict.speaking.title}
            lede={dict.speaking.lede}
          />
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          {/* PENDING: Dr. Khatib has been asked for the full talk list; only confirmed entries shown. */}
          <ul className="flex flex-col">
            {talks.map((t) => (
              <li
                key={t.title_en}
                className="grid gap-3 border-b border-warm-gray/15 py-6 md:grid-cols-[100px_1fr_1fr] md:gap-6"
              >
                <Mono className="text-xs uppercase tracking-tracked text-gold">{t.date}</Mono>
                <div>
                  <h3 className="font-display text-lg font-semibold text-cream md:text-xl">
                    {isAr ? t.title_ar : t.title_en}
                  </h3>
                  <p className="text-sm text-warm-gray">{t.venue}</p>
                </div>
                <Mono className="text-[11px] uppercase tracking-tracked text-warm-gray md:justify-self-end">
                  {t.country}
                </Mono>
              </li>
            ))}
          </ul>
          <p className="mt-12 border-l-2 border-warm-gray/30 pl-4 text-sm italic text-warm-gray">
            {isAr ? SPEAKING_PENDING_NOTE_AR : SPEAKING_PENDING_NOTE_EN}
          </p>
        </div>
      </section>
    </article>
  );
}
