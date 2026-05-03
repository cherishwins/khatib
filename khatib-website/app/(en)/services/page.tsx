import type { Metadata } from 'next';
import { ServicesPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.services.title,
  description: dict.services.lede,
  path: '/services',
  locale: 'en',
});

export default function Page() {
  return <ServicesPage locale="en" dict={dict} />;
}
