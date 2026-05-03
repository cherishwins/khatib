import Link from 'next/link';
import clsx from 'clsx';
import { Mono } from './atoms';

export function PillarCard({
  number,
  title,
  summary,
  href,
  cta,
}: {
  number: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 border-l-2 border-gold/40 bg-navy/40 p-6 transition-colors hover:border-gold hover:bg-navy/70 md:p-8"
    >
      <Mono className="text-xs uppercase tracking-tracked-wide text-gold">{number}</Mono>
      <h3 className="font-display text-2xl font-semibold leading-tight text-cream md:text-3xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-warm-gray md:text-base">{summary}</p>
      <span className="mt-2 font-mono text-[11px] uppercase tracking-tracked-wide text-gold transition-transform group-hover:translate-x-0.5">
        {cta}
      </span>
    </Link>
  );
}

export function PatentCard({
  year,
  title,
  jurisdiction,
  summary,
  href,
  cta,
}: {
  year: string;
  title: string;
  jurisdiction: string;
  summary: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 border border-gold/30 bg-deep-navy/60 p-6 transition-colors hover:border-gold hover:bg-navy"
    >
      <div className="flex items-center justify-between">
        <Mono className="text-xs uppercase tracking-tracked-wide text-gold">
          {year} · {jurisdiction}
        </Mono>
        <span aria-hidden="true" className="font-mono text-xs text-gold/60">
          PATENT
        </span>
      </div>
      <h3 className="font-display text-xl font-semibold leading-snug text-cream md:text-2xl">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-warm-gray">{summary}</p>
      <span className="mt-1 font-mono text-[11px] uppercase tracking-tracked-wide text-gold transition-transform group-hover:translate-x-0.5">
        {cta}
      </span>
    </Link>
  );
}

export function TimelineRow({
  year,
  role,
  institution,
  description,
}: {
  year: string;
  role: string;
  institution: string;
  description?: string;
}) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-4 border-l border-gold/30 py-4 pl-6 md:grid-cols-[110px_1fr] md:gap-6">
      <Mono className="text-xs uppercase tracking-tracked text-gold md:text-sm">{year}</Mono>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-semibold text-cream md:text-xl">{role}</h3>
        <span className="text-sm text-warm-gray">{institution}</span>
        {description && <p className="text-sm leading-relaxed text-warm-gray/80">{description}</p>}
      </div>
    </div>
  );
}

export function StatBlock({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={clsx('flex flex-col gap-1 border-l-2 border-gold pl-4', className)}>
      <span className="font-display text-3xl font-semibold text-cream md:text-4xl">{value}</span>
      <span className="font-mono text-[11px] uppercase tracking-tracked text-warm-gray">
        {label}
      </span>
    </div>
  );
}
