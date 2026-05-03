import type { Metadata } from 'next';
import { LegalPage } from '@/components/khatib/LegalPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.legal.terms.title,
  description: dict.legal.terms.body.slice(0, 160),
  path: '/ar/legal/terms',
  locale: 'ar',
});

export default function Page() {
  return <LegalPage locale="ar" dict={dict} pageKey="terms" />;
}
