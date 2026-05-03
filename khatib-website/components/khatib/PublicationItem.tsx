import { Mono } from './atoms';

export type PublicationType = 'journal' | 'book-chapter' | 'conference' | 'book' | 'thesis';

export interface PublicationItemData {
  num: number;
  year: number;
  type: PublicationType;
  topics: string[]; // topic keys
  title: string;
  venue: string;
  doi?: string;
  externalUrl?: string;
  externalLabel?: string;
  isBook?: boolean;
}

export function PublicationItem({
  pub,
  topicLabels,
  typeLabels,
  doiLabel,
  viewLabel,
}: {
  pub: PublicationItemData;
  topicLabels: Record<string, string>;
  typeLabels: Partial<Record<PublicationType, string>> & Record<string, string>;
  doiLabel: string;
  viewLabel: string;
}) {
  const link = pub.externalUrl ?? (pub.doi ? `https://doi.org/${pub.doi}` : undefined);
  const linkLabel = pub.externalLabel ?? (pub.doi ? `${doiLabel} ${pub.doi}` : viewLabel);
  return (
    <article className="grid grid-cols-[44px_1fr] gap-4 border-t border-warm-gray/15 py-5 md:grid-cols-[60px_1fr] md:gap-6">
      <Mono className="pt-1 text-xs text-gold md:text-sm">
        {String(pub.num).padStart(2, '0')}
      </Mono>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-tracked text-warm-gray">
          <span>{pub.year}</span>
          <span aria-hidden="true">·</span>
          <span>{typeLabels[pub.type] ?? pub.type}</span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-cream md:text-xl">
          {pub.title}
        </h3>
        <p className="italic text-warm-gray">{pub.venue}</p>
        {pub.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pub.topics.map((t) => (
              <span
                key={t}
                className="rounded-sm bg-navy/60 px-2 py-1 font-mono text-[10px] uppercase tracking-tracked text-warm-gray"
              >
                {topicLabels[t] ?? t}
              </span>
            ))}
          </div>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-mono text-[11px] uppercase tracking-tracked text-gold underline-offset-2 hover:underline"
          >
            {linkLabel} &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
