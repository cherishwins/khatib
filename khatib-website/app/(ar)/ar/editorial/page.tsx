import type { Metadata } from 'next';
import { EditorialPage } from '@/components/khatib/EditorialPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.editorial.title,
  description: dict.editorial.lede,
  path: '/ar/editorial',
  locale: 'ar',
});

export default function Page() {
  return <EditorialPage locale="ar" dict={dict} />;
}
