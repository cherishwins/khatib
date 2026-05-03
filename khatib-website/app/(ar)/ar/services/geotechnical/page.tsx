import type { Metadata } from 'next';
import { ServicePillarPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.services.geotechnical.title,
  description: dict.services.geotechnical.lede,
  path: '/ar/services/geotechnical',
  locale: 'ar',
});

export default function Page() {
  return <ServicePillarPage locale="ar" dict={dict} pillarKey="geotechnical" pillarNumber="02" />;
}
