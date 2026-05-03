import type { Metadata } from 'next';
import { ContactPage } from '@/components/khatib/ContactPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.contact.title,
  description: dict.contact.lede,
  path: '/ar/contact',
  locale: 'ar',
});

export default function Page() {
  return <ContactPage locale="ar" dict={dict} />;
}
