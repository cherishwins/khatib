import type { MetadataRoute } from 'next';
import { brand } from '@/lib/tokens';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
