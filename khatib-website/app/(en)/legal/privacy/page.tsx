import type { Metadata } from 'next';
import { LegalPage } from '@/components/khatib/LegalPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.legal.privacy.title,
  description: dict.legal.privacy.body.slice(0, 160),
  path: '/legal/privacy',
  locale: 'en',
});

export default function Page() {
  return <LegalPage locale="en" dict={dict} pageKey="privacy" />;
}
