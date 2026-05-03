// Primary lockup — wordmark with gold rules, EN + AR.
// Use on document headers, hero blocks, capability statements.

import clsx from 'clsx';

interface MarkProps {
  variant?: 'navy' | 'cream' | 'mono-navy' | 'mono-gold';
  className?: string;
}

export function Mark({ variant = 'navy', className }: MarkProps) {
  const colors = palette(variant);
  return (
    <div
      className={clsx(
        'inline-flex flex-col items-stretch gap-3 px-8 py-6',
        variant === 'cream' ? 'bg-cream' : 'bg-deep-navy',
        className,
      )}
    >
      <div className="h-px w-full" style={{ backgroundColor: colors.rule }} />
      <div className="flex flex-col items-center gap-1 px-4">
        <div
          lang="en"
          className="font-display text-2xl font-bold leading-tight md:text-3xl"
          style={{ color: colors.heading }}
        >
          DR. MILAD KHATIB
        </div>
        <div
          lang="en"
          className="font-sans text-[11px] font-medium uppercase tracking-tracked-wide md:text-xs"
          style={{ color: colors.subline }}
        >
          Civil Engineering Consultancy
        </div>
        <div
          lang="ar"
          dir="rtl"
          className="font-arabic text-base font-medium md:text-lg"
          style={{ color: colors.arabic }}
        >
          د. ميلاد الخطيب
        </div>
        <div
          lang="ar"
          dir="rtl"
          className="font-arabic text-xs"
          style={{ color: colors.arabic }}
        >
          الاستشارات الهندسية المدنية
        </div>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: colors.rule }} />
    </div>
  );
}

function palette(variant: MarkProps['variant']) {
  switch (variant) {
    case 'cream':
      return {
        heading: '#0A0E17',
        subline: '#A68A3E',
        arabic: '#5A5651',
        rule: '#C8A44E',
      };
    case 'mono-navy':
      return { heading: '#0A0E17', subline: '#0A0E17', arabic: '#0A0E17', rule: '#0A0E17' };
    case 'mono-gold':
      return { heading: '#C8A44E', subline: '#C8A44E', arabic: '#C8A44E', rule: '#C8A44E' };
    default:
      return {
        heading: '#FFFFFF',
        subline: '#C8A44E',
        arabic: '#9A9589',
        rule: '#C8A44E',
      };
  }
}
