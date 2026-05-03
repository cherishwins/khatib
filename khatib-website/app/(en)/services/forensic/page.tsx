import type { Metadata } from 'next';
import { ServicePillarPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.services.forensic.title,
  description: dict.services.forensic.lede,
  path: '/services/forensic',
  locale: 'en',
});

export default function Page() {
  return <ServicePillarPage locale="en" dict={dict} pillarKey="forensic" pillarNumber="03" />;
}
