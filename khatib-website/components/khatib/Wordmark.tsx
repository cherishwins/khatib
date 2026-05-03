import clsx from 'clsx';

interface WordmarkProps {
  className?: string;
  lang?: 'en' | 'ar' | 'both';
}

export function Wordmark({ className, lang = 'both' }: WordmarkProps) {
  return (
    <span className={clsx('inline-flex items-baseline gap-3 leading-none', className)}>
      {(lang === 'en' || lang === 'both') && (
        <span className="font-display text-lg font-semibold tracking-tight md:text-xl">
          Dr. Milad Khatib
        </span>
      )}
      {lang === 'both' && (
        <span aria-hidden="true" className="text-warm-gray opacity-60">
          ·
        </span>
      )}
      {(lang === 'ar' || lang === 'both') && (
        <span dir="rtl" className="font-arabic text-base md:text-lg">
          د. ميلاد الخطيب
        </span>
      )}
    </span>
  );
}
