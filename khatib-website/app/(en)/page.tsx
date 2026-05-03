import type { Metadata } from 'next';
import { HomePage } from '@/components/khatib/HomePage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, personJsonLd, websiteJsonLd } from '@/lib/metadata';

const dict = getDictionary('en');

export const metadata: Metadata = buildMetadata({
  title: 'Dr. Milad Khatib · Civil Engineering Consultancy',
  description:
    'Beirut-based civilian civil engineering consultancy. Structural, geotechnical, and forensic. Two registered patents, fifty-two peer-reviewed publications.',
  path: '/',
  locale: 'en',
  ogType: 'profile',
});

export default function HomeEn() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd('en')]),
        }}
      />
      <HomePage locale="en" dict={dict} />
    </>
  );
}
