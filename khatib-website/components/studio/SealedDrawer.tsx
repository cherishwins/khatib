'use client';

import { useEffect, useState } from 'react';
import { deleteSealed, loadSealed, summarise, type DocumentKind, type SealedDocument } from '@/lib/studio/sealed';

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

const KIND_LABEL: Record<DocumentKind, string> = {
  letter: 'LETTER',
  capability: 'CAPABILITY',
};

export function SealedDrawer({
  open,
  onClose,
  onRestore,
  refreshKey,
  filterKind,
}: {
  open: boolean;
  onClose: () => void;
  onRestore: (entry: SealedDocument) => void;
  refreshKey: number;
  filterKind?: DocumentKind;
}) {
  const [entries, setEntries] = useState<SealedDocument[]>([]);

  useEffect(() => {
    if (open) {
      const all = loadSealed();
      setEntries(filterKind ? all.filter((e) => e.kind === filterKind) : all);
    }
  }, [open, refreshKey, filterKind]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="palette-overlay no-print"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Sealed documents"
    >
      <div className="sealed-drawer">
        <header className="sealed-h">
          <div>
            <p className="sealed-eyebrow">SEALED · {filterKind ? KIND_LABEL[filterKind] : 'ALL'}</p>
            <p className="sealed-count">
              {entries.length} record{entries.length === 1 ? '' : 's'}
            </p>
          </div>
          <button type="button" onClick={onClose} className="sealed-close" aria-label="Close">
            ESC
          </button>
        </header>
        {entries.length === 0 ? (
          <p className="sealed-empty">
            No documents sealed yet. Compose one and click Seal &amp; Export.
          </p>
        ) : (
          <ul className="sealed-list">
            {entries.map((entry) => {
              const summary = summarise(entry);
              return (
                <li key={entry.id} className="sealed-row">
                  <button
                    type="button"
                    className="sealed-row-main"
                    onClick={() => {
                      onRestore(entry);
                      onClose();
                    }}
                    title="Restore as draft"
                  >
                    <div className="sealed-row-meta">
                      <span className="sealed-ref">{summary.ref}</span>
                      <span className="sealed-locale">{entry.locale.toUpperCase()}</span>
                      <span className="sealed-kind" data-kind={entry.kind}>
                        {KIND_LABEL[entry.kind]}
                      </span>
                      <span className="sealed-ts">{formatTimestamp(entry.sealedAt)}</span>
                    </div>
                    <div className="sealed-re" dir={entry.locale === 'ar' ? 'rtl' : 'ltr'}>
                      {summary.subject || (entry.locale === 'ar' ? '— بدون موضوع —' : '— no subject —')}
                    </div>
                  </button>
                  <button
                    type="button"
                    className="sealed-delete"
                    onClick={() => {
                      const next = deleteSealed(entry.id);
                      setEntries(filterKind ? next.filter((e) => e.kind === filterKind) : next);
                    }}
                    aria-label="Delete record"
                    title="Delete record"
                  >
                    ×
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
