import type { Metadata } from 'next';
import { LegalPage } from '@/components/khatib/LegalPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.legal.imprint.title,
  description: dict.legal.imprint.body.slice(0, 160),
  path: '/ar/legal/imprint',
  locale: 'ar',
});

export default function Page() {
  return <LegalPage locale="ar" dict={dict} pageKey="imprint" />;
}
