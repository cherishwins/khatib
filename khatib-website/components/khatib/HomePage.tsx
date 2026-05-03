import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import { brand, profiles } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono, Tagline, GoldRule } from './atoms';
import { PillarCard, PatentCard } from './cards';
import { PublicationItem } from './PublicationItem';
import { SectionHeading } from './SectionHeading';
import { publications, totalCount } from '@/content/publications';
import { patents } from '@/content/patents';

// Six anchor publications. Each ties to a methodology referenced elsewhere on
// the site (services pages, patent case studies, About credentials):
//   #29 — monostrand anchors (forensic/structural anchor; cited in /services/forensic)
//   #27 — punching-shear inverted-U (companion to the book on Amazon)
//   #14 — inverted-U connectors (composite beams; structural pillar grounding)
//   #30 — AI in disaster mitigation (ICCEIC 2024 keynote subject)
//   #39 — open-source MATLAB MDOF seismic tool (recent, scriptable, peer-reviewed)
//   #12 — numerical seismic on arch dam (geotechnical pillar grounding)
const SELECTED_PUBLICATION_NUMS = [29, 27, 14, 30, 39, 12];

export function HomePage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const prefix = locale === 'en' ? '' : '/ar';
  const selected = SELECTED_PUBLICATION_NUMS.map((n) => publications.find((p) => p.num === n)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const book = publications.find((p) => p.isBook);
  const isAr = locale === 'ar';

  return (
    <div className="text-cream">
      {/* HERO */}
      <section className="relative overflow-hidden bg-deep-navy">
        <div className="absolute inset-0 bg-iso-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[5fr_6fr] md:gap-16 md:px-8 md:py-28 lg:py-36">
          {/* Portrait column */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/5] overflow-hidden border border-gold/30">
              <Image
                src="/images/khatib-portrait.png"
                alt={isAr ? 'د. ميلاد الخطيب في مكتبه، بيروت، 2026' : 'Dr. Milad Khatib at his office, Beirut, 2026'}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/10 to-deep-navy/85" />
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 bg-deep-navy/85 px-4 py-3 backdrop-blur-sm">
                <Mono className="text-[10px] uppercase tracking-tracked text-gold">
                  {dict.meta.city} · 2026
                </Mono>
              </div>
            </div>
          </div>

          {/* Type column */}
          <div className="order-1 flex flex-col gap-6 md:order-2 md:gap-8">
            <Mono className="text-[11px] uppercase tracking-tracked text-gold">
              {dict.home.eyebrow}
            </Mono>
            <GoldRule width={64} />
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream md:text-6xl lg:text-7xl">
              {dict.home.h1}
            </h1>
            <p className="font-mono text-sm uppercase tracking-tracked-wide text-gold md:text-base">
              {dict.home.subline}
            </p>
            <p
              dir={isAr ? 'ltr' : 'rtl'}
              lang={isAr ? 'en' : 'ar'}
              className={
                isAr
                  ? 'font-display text-2xl text-warm-gray md:text-3xl'
                  : 'font-arabic text-2xl text-warm-gray md:text-3xl'
              }
            >
              {isAr ? brand.shortNameEn : brand.shortNameAr}
            </p>
            <Tagline lang={isAr ? 'ar' : 'en'} className="mt-4 text-xl md:text-2xl" />
          </div>
        </div>

        {/* Credential strip */}
        <div className="relative border-t border-warm-gray/15 bg-deep-navy/80">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-5 font-mono text-[11px] uppercase tracking-tracked text-warm-gray md:text-xs">
            {dict.home.credentials.map((credential, i) => (
              <span key={credential} className="flex items-center gap-6">
                <span>{credential}</span>
                {i < dict.home.credentials.length - 1 && (
                  <span aria-hidden="true" className="text-gold/60">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-navy/50 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="01"
            eyebrow={isAr ? 'الممارسة' : 'Practice'}
            title={dict.home.pillarsTitle}
            lede={dict.home.pillarsLede}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            <PillarCard {...dict.home.pillars.structural} cta={dict.home.pillarCta} />
            <PillarCard {...dict.home.pillars.geotechnical} cta={dict.home.pillarCta} />
            <PillarCard {...dict.home.pillars.forensic} cta={dict.home.pillarCta} />
          </div>
        </div>
      </section>

      {/* SELECTED PUBLICATIONS */}
      <section className="bg-deep-navy px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="02"
            eyebrow={isAr ? 'المنشورات' : 'Publications'}
            title={dict.home.selectedTitle}
            lede={dict.home.selectedLede}
          />

          {book && (
            <div className="mt-10 border border-gold/40 bg-navy/50 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <Mono className="text-[10px] uppercase tracking-tracked text-gold">
                  {isAr ? 'كتاب' : 'Book'} · {book.year}
                </Mono>
                <Mono className="text-[10px] uppercase tracking-tracked text-gold/70">
                  Amazon
                </Mono>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-cream md:text-3xl">
                {book.title}
              </h3>
              <p className="mt-2 italic text-warm-gray">{book.venue}</p>
              <a
                href={profiles.amazonBook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
              >
                {isAr ? 'اطّلع على الكتاب على أمازون ←' : 'View book on Amazon →'}
              </a>
            </div>
          )}

          <div className="mt-10">
            {selected.map((pub) => (
              <PublicationItem
                key={pub.num}
                pub={pub}
                topicLabels={dict.publications.topics}
                typeLabels={dict.publications.types}
                doiLabel={dict.publications.doiLabel}
                viewLabel={dict.publications.viewVenue}
              />
            ))}
          </div>

          <div className="mt-10 border-t border-warm-gray/20 pt-6">
            <Link
              href={`${prefix}/publications`}
              className="font-mono text-xs uppercase tracking-tracked text-gold hover:underline"
            >
              {dict.home.viewAll.replace('52', String(totalCount))}
            </Link>
          </div>
        </div>
      </section>

      {/* PATENTS */}
      <section className="bg-navy/50 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            number="03"
            eyebrow={isAr ? 'براءات الاختراع' : 'Patents'}
            title={dict.home.patentsTitle}
            lede={dict.home.patentsLede}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <PatentCard
              year={dict.patents.vessel.year}
              title={dict.patents.vessel.title}
              jurisdiction={dict.patents.vessel.jurisdiction}
              summary={dict.patents.vessel.summary}
              href={dict.patents.vessel.href}
              cta={dict.home.patentCta}
            />
            <PatentCard
              year={dict.patents.foodCollector.year}
              title={dict.patents.foodCollector.title}
              jurisdiction={dict.patents.foodCollector.jurisdiction}
              summary={dict.patents.foodCollector.summary}
              href={dict.patents.foodCollector.href}
              cta={dict.home.patentCta}
            />
          </div>
          <p className="mt-6 max-w-prose text-sm text-warm-gray">
            {isAr
              ? `كلا البراءتين مسجَّلتان في لبنان. أرقام التسجيل قيد التأكيد لدى العميل.`
              : `Both patents registered in Lebanon. Registration numbers pending client confirmation.`}
          </p>
          {/* Reference patent count silently in HTML so audits can verify */}
          <span className="sr-only">{patents.length === 2 ? 'Two patents indexed.' : ''}</span>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-deep-navy px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
          <p className="font-display text-3xl italic text-gold md:text-5xl">
            {dict.home.closingTagline}
          </p>
          <p
            dir={isAr ? 'ltr' : 'rtl'}
            lang={isAr ? 'en' : 'ar'}
            className={isAr ? 'font-display text-xl italic text-warm-gray md:text-2xl' : 'font-arabic text-xl text-warm-gray md:text-2xl'}
          >
            {dict.home.closingPair}
          </p>
          <GoldRule width={96} className="mt-2" />
          <div className="flex flex-col items-center gap-3 text-sm">
            <Mono className="text-[10px] uppercase tracking-tracked text-gold">
              {dict.home.contactMini.label}
            </Mono>
            <a className="text-base text-cream hover:text-gold" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            <Link
              href={`${prefix}/contact`}
              className="font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
            >
              {dict.home.contactMini.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
