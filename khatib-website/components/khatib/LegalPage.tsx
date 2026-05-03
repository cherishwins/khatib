import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { SectionHeading } from './SectionHeading';

type LegalKey = 'privacy' | 'terms' | 'imprint';

export function LegalPage({
  locale,
  dict,
  pageKey,
}: {
  locale: Locale;
  dict: Dictionary;
  pageKey: LegalKey;
}) {
  const isAr = locale === 'ar';
  const block = dict.legal[pageKey];
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'قانوني' : 'Legal'}
            title={block.title}
          />
        </div>
      </header>
      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-base leading-relaxed text-warm-gray md:text-lg">{block.body}</p>
        </div>
      </section>
    </article>
  );
}
