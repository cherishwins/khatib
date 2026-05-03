import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import { brand, profiles } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { GoldRule, Tagline } from './atoms';
import { Wordmark } from './Wordmark';

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const prefix = locale === 'en' ? '' : '/ar';
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gold/30 bg-deep-navy">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <Wordmark lang="both" />
            <Tagline lang={locale === 'en' ? 'en' : 'ar'} />
            <p className="max-w-xs text-sm text-warm-gray">{dict.footer.oeaLine}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-tracked text-gold">
                {dict.footer.practice}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-warm-gray">
                <li><Link className="hover:text-cream" href={`${prefix}/services/structural`}>{dict.services.structural?.title ?? 'Structural'}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/services/geotechnical`}>{dict.services.geotechnical?.title ?? 'Geotechnical'}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/services/forensic`}>{dict.services.forensic?.title ?? 'Forensic'}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/teaching`}>{dict.nav.teaching}</Link></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-tracked text-gold">
                {dict.footer.registration}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-warm-gray">
                <li><Link className="hover:text-cream" href={`${prefix}/about`}>{dict.nav.about}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/editorial`}>{dict.nav.editorial}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/legal/imprint`}>{dict.footer.imprint}</Link></li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-tracked text-gold">
                {dict.footer.innovation}
              </span>
              <ul className="flex flex-col gap-2 text-sm text-warm-gray">
                <li><Link className="hover:text-cream" href={`${prefix}/patents`}>{dict.nav.patents}</Link></li>
                <li><Link className="hover:text-cream" href={`${prefix}/publications`}>{dict.nav.publications}</Link></li>
                <li>
                  <a className="hover:text-cream" href={`https://orcid.org/${profiles.orcid}`} target="_blank" rel="noopener noreferrer">ORCID</a>
                </li>
                <li>
                  <a className="hover:text-cream" href={`https://www.scopus.com/authid/detail.uri?authorId=${profiles.scopus}`} target="_blank" rel="noopener noreferrer">Scopus</a>
                </li>
                <li>
                  <a className="hover:text-cream" href={`https://scholar.google.com/citations?user=${profiles.googleScholar}`} target="_blank" rel="noopener noreferrer">Google Scholar</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <GoldRule />

        <div className="flex flex-col gap-4 text-xs text-warm-gray md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.shortNameEn}. {dict.footer.rights}
          </span>
          <span className="font-mono uppercase tracking-tracked">
            ORCID {profiles.orcid}
          </span>
          <ul className="flex gap-4">
            <li><Link className="hover:text-cream" href={`${prefix}/legal/privacy`}>{dict.footer.privacy}</Link></li>
            <li><Link className="hover:text-cream" href={`${prefix}/legal/terms`}>{dict.footer.terms}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
