import { talks } from '@/content/speaking';
import { brand } from '@/lib/tokens';
import { toIso8601Date } from '@/lib/iso-date';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;

export function speakingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected speaking engagements by Dr. Milad Khatib',
    itemListElement: talks.map((talk, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: talk.title_en,
        startDate: toIso8601Date(talk.date),
        location: {
          '@type': 'Place',
          name: talk.venue,
          address: {
            '@type': 'PostalAddress',
            addressCountry: talk.country,
          },
        },
        performer: {
          '@type': 'Person',
          name: 'Dr. Milad Khatib',
        },
        url: talk.link ?? `${SITE}/speaking`,
      },
    })),
  };
}
