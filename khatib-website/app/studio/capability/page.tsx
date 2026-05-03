import { requireSession } from '@/lib/studio/auth';
import { CapabilityStudio } from '@/components/studio/CapabilityStudio';

export const dynamic = 'force-dynamic';

export default function CapabilityPage() {
  const session = requireSession();
  return <CapabilityStudio userEmail={session.email} />;
}
