import type { Metadata } from 'next';
import { EditorialPage } from '@/components/khatib/EditorialPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.editorial.title,
  description: dict.editorial.lede,
  path: '/editorial',
  locale: 'en',
});

export default function Page() {
  return <EditorialPage locale="en" dict={dict} />;
}
