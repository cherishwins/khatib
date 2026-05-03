import type { Metadata } from 'next';
import { PublicationsPage } from '@/components/khatib/PublicationsPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.publications.title,
  description: dict.publications.lede,
  path: '/publications',
  locale: 'en',
});

export default function Page() {
  return <PublicationsPage locale="en" dict={dict} />;
}
