import clsx from 'clsx';
import { Eyebrow } from './atoms';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'start' | 'center';
  className?: string;
  invert?: boolean; // dark text on light background
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  lede,
  align = 'start',
  className,
  invert = false,
}: SectionHeadingProps) {
  return (
    <header
      className={clsx(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {(number || eyebrow) && (
        <Eyebrow tone={invert ? 'navy' : 'gold'}>
          {[number, eyebrow].filter(Boolean).join(' · ')}
        </Eyebrow>
      )}
      <h2
        className={clsx(
          'max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl',
          invert ? 'text-deep-navy' : 'text-cream',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={clsx(
            'max-w-prose text-base leading-relaxed md:text-lg',
            invert ? 'text-stone' : 'text-warm-gray',
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}
