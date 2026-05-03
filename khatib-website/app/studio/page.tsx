import { redirect } from 'next/navigation';
import { currentSession } from '@/lib/studio/auth';
import { StudioDashboard } from '@/components/studio/StudioDashboard';
import { beirutGreeting } from '@/lib/studio/motion';

export const dynamic = 'force-dynamic';

export default function StudioGateway() {
  const session = currentSession();
  if (!session) redirect('/studio/login');
  // Greeting is computed server-side using the Beirut timezone, so SSR matches client.
  return <StudioDashboard userEmail={session.email} greeting={beirutGreeting()} />;
}
