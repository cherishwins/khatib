import clsx from 'clsx';

export function GoldRule({
  width = 'full',
  className,
}: {
  width?: 'full' | 'short' | number;
  className?: string;
}) {
  const widthClass =
    width === 'full' ? 'w-full' : width === 'short' ? 'w-16' : '';
  const inlineStyle = typeof width === 'number' ? { width: `${width}px` } : undefined;
  return (
    <span
      role="presentation"
      style={inlineStyle}
      className={clsx('inline-block h-px bg-gold', widthClass, className)}
    />
  );
}

export function Eyebrow({
  children,
  withRule = true,
  className,
  tone = 'gold',
}: {
  children: React.ReactNode;
  withRule?: boolean;
  className?: string;
  tone?: 'gold' | 'warm' | 'navy';
}) {
  const colorClass = tone === 'gold' ? 'text-gold' : tone === 'navy' ? 'text-deep-navy' : 'text-warm-gray';
  return (
    <div className={clsx('flex items-center gap-3 font-mono text-[11px] uppercase tracking-tracked-wide', colorClass, className)}>
      {withRule && <GoldRule width="short" className={tone === 'navy' ? 'bg-deep-navy' : undefined} />}
      <span>{children}</span>
    </div>
  );
}

export function Tagline({ lang = 'both', className }: { lang?: 'en' | 'ar' | 'both'; className?: string }) {
  return (
    <div className={clsx('flex flex-col gap-1 font-display italic', className)}>
      {(lang === 'en' || lang === 'both') && (
        <span className="text-gold">Engineering by proof.</span>
      )}
      {(lang === 'ar' || lang === 'both') && (
        <span dir="rtl" className="font-arabic text-warm-gray not-italic">
          الهندسة بالبرهان.
        </span>
      )}
    </div>
  );
}

export function Citation({ children, className }: { children: React.ReactNode; className?: string }) {
  return <cite className={clsx('text-sm not-italic text-warm-gray', className)}>{children}</cite>;
}

export function Mono({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={clsx('font-mono', className)}>{children}</span>;
}
