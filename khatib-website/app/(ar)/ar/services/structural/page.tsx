import type { Metadata } from 'next';
import { ServicePillarPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.services.structural.title,
  description: dict.services.structural.lede,
  path: '/ar/services/structural',
  locale: 'ar',
});

export default function Page() {
  return <ServicePillarPage locale="ar" dict={dict} pillarKey="structural" pillarNumber="01" />;
}
