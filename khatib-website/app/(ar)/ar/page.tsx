import type { Metadata } from 'next';
import { HomePage } from '@/components/khatib/HomePage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, personJsonLd, websiteJsonLd } from '@/lib/metadata';

const dict = getDictionary('ar');

export const metadata: Metadata = buildMetadata({
  title: 'د. ميلاد الخطيب · الاستشارات الهندسية المدنية',
  description:
    'مكتب استشارات هندسية مدنية في بيروت. إنشائي، جيوتقني، وخبرة فنية. براءتا اختراع مسجَّلتان، اثنان وخمسون منشوراً محكّماً.',
  path: '/ar',
  locale: 'ar',
  ogType: 'profile',
});

export default function HomeAr() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd(), websiteJsonLd('ar')]),
        }}
      />
      <HomePage locale="ar" dict={dict} />
    </>
  );
}
