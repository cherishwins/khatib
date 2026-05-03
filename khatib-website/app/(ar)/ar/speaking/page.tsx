import type { Metadata } from 'next';
import { SpeakingPage } from '@/components/khatib/SpeakingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.speaking.title,
  description: dict.speaking.lede,
  path: '/ar/speaking',
  locale: 'ar',
});

export default function Page() {
  return <SpeakingPage locale="ar" dict={dict} />;
}
