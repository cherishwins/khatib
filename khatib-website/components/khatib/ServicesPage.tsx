import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import { PillarCard } from './cards';

export function ServicesPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'الخدمات' : 'Services'}
            title={dict.services.title}
            lede={dict.services.lede}
          />
        </div>
      </header>

      <section className="px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <PillarCard
            number="01"
            title={dict.services.structural.title}
            summary={dict.services.structural.lede}
            href={isAr ? '/ar/services/structural' : '/services/structural'}
            cta={dict.home.pillarCta}
          />
          <PillarCard
            number="02"
            title={dict.services.geotechnical.title}
            summary={dict.services.geotechnical.lede}
            href={isAr ? '/ar/services/geotechnical' : '/services/geotechnical'}
            cta={dict.home.pillarCta}
          />
          <PillarCard
            number="03"
            title={dict.services.forensic.title}
            summary={dict.services.forensic.lede}
            href={isAr ? '/ar/services/forensic' : '/services/forensic'}
            cta={dict.home.pillarCta}
          />
        </div>
      </section>
    </article>
  );
}

interface PillarKey {
  key: 'structural' | 'geotechnical' | 'forensic';
  number: string;
}

export function ServicePillarPage({
  locale,
  dict,
  pillarKey,
  pillarNumber,
}: {
  locale: Locale;
  dict: Dictionary;
  pillarKey: PillarKey['key'];
  pillarNumber: string;
}) {
  const isAr = locale === 'ar';
  const pillar = dict.services[pillarKey];
  const prefix = isAr ? '/ar' : '';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
            {pillarNumber} · {isAr ? 'ركيزة' : 'Pillar'}
          </Mono>
          <h1 className="font-display text-4xl font-semibold leading-tight text-cream md:text-6xl">
            {pillar.title}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-warm-gray md:text-xl">{pillar.lede}</p>
        </div>
      </header>

      <section className="px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
              {isAr ? 'المنهجية' : 'Methodology'}
            </Mono>
            <ul className="flex flex-col gap-3 text-sm text-warm-gray md:text-base">
              {pillar.methodology.map((m) => (
                <li key={m} className="border-l-2 border-gold/40 pl-4">
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
              {isAr ? 'أعمال تمثيلية' : 'Representative work'}
            </Mono>
            <ul className="flex flex-col gap-3 text-sm text-warm-gray md:text-base">
              {pillar.representative.map((m) => (
                <li key={m} className="border-l-2 border-warm-gray/30 pl-4">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-navy/50 px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
            {isAr ? 'متى تكون هذه الخدمة مناسبة' : 'When this engagement makes sense'}
          </Mono>
          <ul className="flex flex-col gap-4 text-base text-cream md:text-lg">
            {pillar.when.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
          {pillarKey === 'forensic' && 'jurisdictions' in pillar && (
            <div className="mt-12 grid gap-8 border-t border-warm-gray/20 pt-8 md:grid-cols-2">
              <div>
                <Mono className="mb-2 block text-[11px] uppercase tracking-tracked text-gold">
                  {isAr ? 'الاختصاص القضائي' : 'Jurisdictions'}
                </Mono>
                <p className="text-sm text-warm-gray">{pillar.jurisdictions}</p>
              </div>
              <div>
                <Mono className="mb-2 block text-[11px] uppercase tracking-tracked text-gold">
                  {isAr ? 'نموذج التوكيل' : 'Retainer model'}
                </Mono>
                <p className="text-sm text-warm-gray">{pillar.retainer}</p>
              </div>
            </div>
          )}
          <Link
            href={`${prefix}/contact`}
            className="mt-12 inline-block font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
          >
            {isAr ? 'تواصل بشأن هذه الخدمة ←' : 'Contact about this engagement →'}
          </Link>
        </div>
      </section>
    </article>
  );
}
