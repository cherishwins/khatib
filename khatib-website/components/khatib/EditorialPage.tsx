import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';
import { editorialGroups, editorialTotal } from '@/content/editorial-roles';

export function EditorialPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'هيئات التحرير' : 'Editorial'}
            title={dict.editorial.title}
            lede={dict.editorial.lede}
          />
          <p className="mt-6 font-mono text-sm uppercase tracking-tracked text-gold">
            {editorialTotal} {isAr ? 'دوراً' : 'positions'}
          </p>
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-16">
          {editorialGroups.map((group, idx) => (
            <div key={group.region}>
              <div className="mb-6 flex items-baseline gap-4">
                <Mono className="text-[11px] uppercase tracking-tracked text-gold">
                  {String(idx + 1).padStart(2, '0')} · {isAr ? 'منطقة' : 'Region'}
                </Mono>
                <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
                  {group.region}
                </h2>
              </div>
              <ul className="flex flex-col">
                {group.roles.map((role) => (
                  <li
                    key={`${group.region}-${role.name}`}
                    className="grid grid-cols-1 gap-2 border-t border-warm-gray/15 py-4 md:grid-cols-[1fr_2fr_1fr] md:gap-6"
                  >
                    <Mono className="text-[10px] uppercase tracking-tracked text-gold/80">
                      {role.role}
                    </Mono>
                    <div>
                      <p className="text-base text-cream">{role.name}</p>
                      <p className="text-sm text-warm-gray">{role.publisher}</p>
                    </div>
                    {role.link && (
                      <a
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline md:justify-self-end"
                      >
                        {isAr ? 'تحقّق ←' : 'Verify →'}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
