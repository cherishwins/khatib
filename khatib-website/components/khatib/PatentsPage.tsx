import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono, GoldRule } from './atoms';
import { SectionHeading } from './SectionHeading';
import { PatentCard } from './cards';
import { patents, type Patent } from '@/content/patents';

export function PatentsIndexPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'الابتكار' : 'Innovation'}
            title={dict.patents.title}
            lede={dict.patents.lede}
          />
        </div>
      </header>

      <section className="px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
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
      </section>
    </article>
  );
}

export function PatentDetailPage({
  locale,
  dict,
  patent,
}: {
  locale: Locale;
  dict: Dictionary;
  patent: Patent;
}) {
  const isAr = locale === 'ar';
  const prefix = isAr ? '/ar' : '';
  const title = isAr ? patent.title_ar : patent.title_en;
  const abstract = isAr ? patent.abstract_ar : patent.abstract_en;
  const claims = isAr ? patent.claims_ar : patent.claims_en;
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
            {isAr ? 'دراسة حالة براءة اختراع' : 'Patent case study'} · {patent.year} ·{' '}
            {isAr ? 'لبنان' : patent.jurisdiction}
          </Mono>
          <h1 className="font-display text-3xl font-semibold leading-tight text-cream md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </header>

      {/* META STRIP */}
      <section className="border-b border-warm-gray/15 bg-navy/30 px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-4">
          <MetaItem
            label={isAr ? 'الاختصاص' : 'Jurisdiction'}
            value={isAr ? 'لبنان' : patent.jurisdiction}
          />
          <MetaItem label={isAr ? 'سنة الإيداع' : 'Filed'} value={String(patent.year)} />
          <MetaItem
            label={isAr ? 'رقم التسجيل' : 'Registration #'}
            value={patent.registrationNumber}
            pending
          />
          <MetaItem
            label={isAr ? 'الحالة' : 'Status'}
            value={isAr ? patent.status_ar : patent.status_en}
          />
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-12">
            <div>
              <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
                {isAr ? 'مُلَخَّص' : 'Abstract'}
              </Mono>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-warm-gray md:text-lg">
                {abstract.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div>
              <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
                {isAr ? 'موجز المطالب' : 'Claim Summary'}
              </Mono>
              <ul className="flex flex-col gap-3 text-base text-warm-gray md:text-lg">
                {claims.map((c) => (
                  <li key={c} className="border-l-2 border-gold/40 pl-4">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            {patent.companion && (
              <div className="border border-warm-gray/30 bg-navy/40 p-5">
                <Mono className="mb-2 block text-[10px] uppercase tracking-tracked text-gold">
                  {isAr ? 'المنشور المرافق' : 'Companion publication'}
                </Mono>
                <p className="italic text-cream">
                  {isAr ? patent.companion.citation_ar : patent.companion.citation_en}
                </p>
                {patent.companion.doi && (
                  <a
                    href={`https://doi.org/${patent.companion.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
                  >
                    DOI {patent.companion.doi} &rarr;
                  </a>
                )}
                {!patent.companion.doi && patent.companion.note_en && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-tracked text-warm-gray">
                    {isAr ? patent.companion.note_ar : patent.companion.note_en}
                  </p>
                )}
              </div>
            )}

            <div className="border border-warm-gray/30 bg-navy/40 p-5">
              <Mono className="mb-2 block text-[10px] uppercase tracking-tracked text-gold">
                {isAr ? 'المخترعون' : 'Inventors'}
              </Mono>
              <p className="text-base text-cream">{patent.inventors}</p>
            </div>

            <div className="border border-gold/40 bg-deep-navy p-5">
              <Mono className="mb-2 block text-[10px] uppercase tracking-tracked text-gold">
                {isAr ? 'الترخيص' : 'Licensing'}
              </Mono>
              <p className="text-sm leading-relaxed text-warm-gray">
                {isAr
                  ? 'الاستفسارات تتمّ عبر صفحة التواصل تحت اتفاقية NCNDA.'
                  : 'Licensing inquiries route through the contact page under NCNDA.'}
              </p>
              <Link
                href={`${prefix}/contact`}
                className="mt-3 inline-block font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
              >
                {isAr ? 'بدء استفسار ترخيص ←' : 'Start a licensing inquiry →'}
              </Link>
            </div>
          </aside>
        </div>

        <GoldRule className="mx-auto mt-16 max-w-5xl" />
      </section>
    </article>
  );
}

function MetaItem({ label, value, pending = false }: { label: string; value: string; pending?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <Mono className="text-[10px] uppercase tracking-tracked text-warm-gray">{label}</Mono>
      <Mono className={pending ? 'text-sm text-warm-gray/70 italic' : 'text-sm text-cream'}>
        {value}
      </Mono>
    </div>
  );
}

export function patentSlugs(): string[] {
  return patents.map((p) => p.slug);
}
