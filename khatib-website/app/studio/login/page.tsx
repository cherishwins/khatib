import { currentSession } from '@/lib/studio/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/studio/LoginForm';

export const dynamic = 'force-dynamic';

const ERROR_MESSAGES: Record<string, string> = {
  'missing-token': 'That sign-in link was incomplete. Please request a new one.',
  expired: 'That sign-in link has expired. Please request a new one.',
  'bad-signature': 'That sign-in link is invalid. Please request a new one.',
  'bad-payload': 'That sign-in link could not be read. Please request a new one.',
  'wrong-kind': 'That link cannot be used to sign in.',
  'not-allowed': 'That email address is not authorised for the studio.',
};

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  if (currentSession()) redirect('/studio');
  const errorMessage = searchParams.error ? (ERROR_MESSAGES[searchParams.error] ?? 'Sign-in failed.') : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <div className="mb-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-tracked text-gold">Khatib Studio</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">Sign in</h1>
        <p className="mt-3 text-sm text-warm-gray">
          Enter your email. A one-time sign-in link is valid for 15 minutes.
        </p>
      </div>
      {errorMessage && (
        <p role="alert" className="mb-6 border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">
          {errorMessage}
        </p>
      )}
      <LoginForm />
    </main>
  );
}
