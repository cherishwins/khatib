'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { beirutGreeting } from '@/lib/studio/motion';
import { loadSealed, summarise, type SealedDocument } from '@/lib/studio/sealed';

interface ToolCard {
  href: string;
  eyebrow: string;
  title: string;
  blurb: string;
  cta: string;
}

const TOOLS: ToolCard[] = [
  {
    href: '/studio/letter',
    eyebrow: '01 · CORRESPONDENCE',
    title: 'Letterhead',
    blurb:
      'Compose technical opinions, proposals, OEA correspondence, and patent licensing replies on the brand letterhead — bilingual EN/AR, A4 PDF in two minutes.',
    cta: 'Open Letterhead →',
  },
  {
    href: '/studio/capability',
    eyebrow: '02 · TENDERS',
    title: 'Capability Statement',
    blurb:
      'Generate a brand-perfect 4-page capability statement tailored to a specific tender. Cover, practice, representative work, credentials — customise only what changes per engagement.',
    cta: 'Open Capability Statement →',
  },
];

function relativeTime(iso: string): string {
  const d = new Date(iso);
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}d ago`;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function StudioDashboard({ userEmail, greeting }: { userEmail: string; greeting: string }) {
  const [sealed, setSealed] = useState<SealedDocument[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSealed(loadSealed());
    setHydrated(true);
  }, []);

  function restore(entry: SealedDocument) {
    sessionStorage.setItem('khatib-studio-restore-pending', JSON.stringify(entry));
    window.location.href = entry.kind === 'capability' ? '/studio/capability' : '/studio/letter';
  }

  return (
    <div className="workshop">
      <div className="workshop-top">
        <div className="workshop-brand">
          KHATIB STUDIO<span className="workshop-brand-rule" />DASHBOARD
        </div>
        <div className="workshop-meta">
          <span title={`Signed in as ${userEmail}`}>{userEmail.split('@')[0]}</span>
          <form action="/api/studio/logout" method="post" style={{ display: 'inline' }}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </div>

      <main className="dash">
        <header className="dash-hero">
          <div className="dash-eyebrow">
            <span className="dash-eyebrow-rule" />
            <span>{greeting}</span>
          </div>
          <h1 className="dash-title">Studio</h1>
          <p className="dash-lede">
            Brand-locked document workshop. Pick a tool — every output is brand-perfect on first
            export, bilingual, and signed with the OEA-registered practice line.
          </p>
        </header>

        <section className="dash-tools" aria-label="Tools">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="dash-card">
              <div className="dash-card-eyebrow">{tool.eyebrow}</div>
              <h2 className="dash-card-title">{tool.title}</h2>
              <p className="dash-card-blurb">{tool.blurb}</p>
              <span className="dash-card-cta">{tool.cta}</span>
            </Link>
          ))}
        </section>

        <section className="dash-recent" aria-label="Recent sealed documents">
          <header className="dash-recent-h">
            <span className="dash-eyebrow-rule" />
            <h3>Recent sealed documents</h3>
            <span className="dash-recent-count">{sealed.length}</span>
          </header>
          {!hydrated ? (
            <p className="dash-recent-empty">Loading…</p>
          ) : sealed.length === 0 ? (
            <p className="dash-recent-empty">
              No documents sealed yet. Compose one and click Seal &amp; Export to see it here.
            </p>
          ) : (
            <ul className="dash-recent-list">
              {sealed.slice(0, 8).map((entry) => {
                const summary = summarise(entry);
                return (
                  <li key={entry.id} className="dash-recent-row">
                    <button type="button" onClick={() => restore(entry)} className="dash-recent-btn" title="Restore as draft">
                      <span className="dash-recent-ref">{summary.ref}</span>
                      <span className="dash-recent-locale">{entry.locale.toUpperCase()}</span>
                      <span className="dash-recent-kind" data-kind={entry.kind}>
                        {entry.kind === 'capability' ? 'CAPABILITY' : 'LETTER'}
                      </span>
                      <span className="dash-recent-re" dir={entry.locale === 'ar' ? 'rtl' : 'ltr'}>
                        {summary.subject || (entry.locale === 'ar' ? '— بدون موضوع —' : '— no subject —')}
                      </span>
                      <span className="dash-recent-ts">{relativeTime(entry.sealedAt)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="dash-foot" aria-label="Brand footer">
          <div className="dash-foot-col">
            <div className="dash-foot-h">PRACTICE</div>
            <div>Beirut · Lebanon</div>
            <div>milad@miladkhatib.com</div>
            <div>+961 3 927 934</div>
          </div>
          <div className="dash-foot-col">
            <div className="dash-foot-h">REGISTRATION</div>
            <div>OEA · Beirut · Member since 1999</div>
            <div>ORCID · 0000-0002-0140-0941</div>
          </div>
          <div className="dash-foot-col">
            <div className="dash-foot-h">STUDIO</div>
            <div>v1.1 · Brand kit v3</div>
            <div>Drafts auto-save to this browser</div>
            <div>Sessions valid 7 days</div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Server-friendly export so the greeting can be computed at request time.
export { beirutGreeting };
