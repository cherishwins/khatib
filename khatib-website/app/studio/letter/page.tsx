import { requireSession } from '@/lib/studio/auth';
import { LetterStudio } from '@/components/studio/LetterStudio';

export const dynamic = 'force-dynamic';

export default function LetterPage() {
  const session = requireSession();
  return <LetterStudio userEmail={session.email} />;
}
