import type { Metadata } from 'next';
import { ServicePillarPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.services.structural.title,
  description: dict.services.structural.lede,
  path: '/services/structural',
  locale: 'en',
});

export default function Page() {
  return <ServicePillarPage locale="en" dict={dict} pillarKey="structural" pillarNumber="01" />;
}
