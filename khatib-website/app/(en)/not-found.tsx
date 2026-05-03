import Link from 'next/link';
import { Mono, Tagline } from '@/components/khatib/atoms';
import { Monogram } from '@/components/khatib/Monogram';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20 text-center">
      <Monogram size={120} />
      <Mono className="text-[11px] uppercase tracking-tracked text-gold">404 · Not found</Mono>
      <h1 className="font-display text-4xl font-semibold text-cream md:text-5xl">
        Page not found.
      </h1>
      <p className="max-w-prose text-warm-gray">
        The route you requested does not exist. The civilian engineering record is over here.
      </p>
      <Link
        href="/"
        className="border border-gold px-6 py-3 font-mono text-[11px] uppercase tracking-tracked text-gold hover:bg-gold hover:text-deep-navy"
      >
        Return home
      </Link>
      <Tagline />
    </main>
  );
}
