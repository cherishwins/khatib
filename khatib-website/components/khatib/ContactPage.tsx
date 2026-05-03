import type { Locale } from '@/lib/tokens';
import { brand, profiles } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import { ContactForm } from './ContactForm';

export function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'تواصل' : 'Contact'}
            title={dict.contact.title}
            lede={dict.contact.lede}
          />
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-16">
          <div className="flex flex-col gap-4">
            <Mono className="text-[11px] uppercase tracking-tracked text-gold">
              {dict.contact.directLabel}
            </Mono>
            <ul className="flex flex-col gap-2 text-sm text-warm-gray">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-cream hover:text-gold"
                >
                  {brand.email}
                </a>
              </li>
              <li>
                {brand.phoneConfirmed ? (
                  <a
                    href={`tel:${brand.phoneCandidate.replace(/\s+/g, '')}`}
                    className="text-cream hover:text-gold"
                  >
                    {brand.phoneCandidate}
                  </a>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-tracked text-warm-gray/70">
                    {isAr ? 'الهاتف · بانتظار التأكيد' : 'Phone · pending confirmation'}
                  </span>
                )}
                <span className="block text-[11px] uppercase tracking-tracked text-warm-gray/70">
                  {isAr ? 'بيروت · UTC+02' : 'Beirut · UTC+02'}
                </span>
              </li>
              <li>{isAr ? 'بيروت، الجمهورية اللبنانية' : 'Beirut, Lebanese Republic'}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Mono className="text-[11px] uppercase tracking-tracked text-gold">
              {dict.contact.academicLabel}
            </Mono>
            <ul className="flex flex-col gap-2 text-sm text-warm-gray">
              <li>
                <a className="hover:text-cream" href={`https://orcid.org/${profiles.orcid}`} target="_blank" rel="noopener noreferrer">ORCID · {profiles.orcid}</a>
              </li>
              <li>
                <a className="hover:text-cream" href={`https://www.scopus.com/authid/detail.uri?authorId=${profiles.scopus}`} target="_blank" rel="noopener noreferrer">Scopus · {profiles.scopus}</a>
              </li>
              <li>
                <a className="hover:text-cream" href={`https://scholar.google.com/citations?user=${profiles.googleScholar}`} target="_blank" rel="noopener noreferrer">Google Scholar</a>
              </li>
              <li>
                <a className="hover:text-cream" href={`https://www.researchgate.net/profile/${profiles.researchgate}`} target="_blank" rel="noopener noreferrer">ResearchGate</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
              {dict.contact.inquiryLabel}
            </Mono>
            <ContactForm locale={locale} dict={dict} />
          </div>
        </div>
      </section>
    </article>
  );
}
