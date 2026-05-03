import type { Metadata } from 'next';
import type { Locale } from './tokens';
import { brand, profiles } from './tokens';

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'profile' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const locale = input.locale ?? 'en';
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';
  const enPath = stripLocale(input.path);
  const arPath = enPath === '/' ? '/ar' : `/ar${enPath}`;
  const canonical = locale === 'en' ? enPath : arPath;
  const ogImage = input.ogImage ?? '/icons-and-meta/og-default.png';
  const ogImageAbsolute = ogImage.startsWith('http') ? ogImage : `${SITE}${ogImage}`;
  const ogImageAlt =
    input.ogImageAlt ?? 'Dr. Milad Khatib at his office, Beirut, 2026.';
  const ogLocale = locale === 'en' ? 'en_US' : 'ar_LB';
  const altLocale = otherLocale === 'en' ? 'en_US' : 'ar_LB';

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
      languages: {
        en: enPath,
        ar: arPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: `${SITE}${canonical}`,
      siteName: 'Dr. Milad Khatib · Civil Engineering Consultancy',
      type: input.ogType ?? 'website',
      locale: ogLocale,
      alternateLocale: [altLocale],
      images: [
        {
          url: ogImageAbsolute,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: 'image/png',
        },
      ],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [ogImageAbsolute],
    },
    robots: {
      index: process.env.VERCEL_ENV !== 'preview',
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

function stripLocale(path: string): string {
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

// Civilian-only Person JSON-LD. Used on home and About.
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: brand.shortNameEn,
    alternateName: brand.shortNameAr,
    jobTitle: 'Civil Engineering Consultant',
    worksFor: [
      { '@type': 'EducationalOrganization', name: 'Lebanese International University' },
      { '@type': 'EducationalOrganization', name: 'University of Balamand' },
      { '@type': 'EducationalOrganization', name: 'ISSAE-Cnam Liban' },
    ],
    affiliation: [
      { '@type': 'Organization', name: 'Order of Engineers and Architects of Beirut (OEA)' },
      { '@type': 'Organization', name: 'SPSC Sustainability Programme' },
      { '@type': 'Organization', name: 'ACSE' },
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Beirut Arab University' },
    ],
    knowsLanguage: ['en', 'fr', 'it', 'ar'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.city,
      addressCountry: 'LB',
    },
    sameAs: [
      `https://orcid.org/${profiles.orcid}`,
      `https://www.scopus.com/authid/detail.uri?authorId=${profiles.scopus}`,
      `https://scholar.google.com/citations?user=${profiles.googleScholar}`,
      `https://www.researchgate.net/profile/${profiles.researchgate}`,
      `https://publons.com/researcher/${profiles.publons}`,
      `https://sciprofiles.com/profile/${profiles.sciprofiles}`,
    ],
    url: SITE,
    image: `${SITE}/icons-and-meta/og-default.png`,
    description:
      'Beirut-based civilian civil engineering consultant. Structural, geotechnical, and forensic. Two registered Lebanese patents, fifty-two peer-reviewed publications, twenty-one editorial positions.',
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE,
    name: locale === 'en' ? brand.nameEn : brand.nameAr,
    inLanguage: locale === 'en' ? 'en' : 'ar',
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.href}`,
    })),
  };
}
