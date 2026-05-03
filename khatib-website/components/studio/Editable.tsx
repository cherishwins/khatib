'use client';

// Single-source-of-truth contentEditable primitives. Used by every document paper.
// Uncontrolled DOM with React-driven initial values; cursor stays put through edits.

import { useEffect, useRef } from 'react';

const PARAGRAPH_SPLIT = /\n{2,}/;

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] as string);
}

export function Editable({
  value,
  onCommit,
  placeholder,
  ariaLabel,
  dir,
  className,
}: {
  value: string;
  onCommit: (v: string) => void;
  placeholder: string;
  ariaLabel?: string;
  dir?: 'ltr' | 'rtl';
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span
      ref={ref}
      role="textbox"
      aria-label={ariaLabel}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-placeholder={placeholder}
      className={`editable ${className ?? ''}`}
      dir={dir}
      onInput={(e) => onCommit((e.currentTarget.textContent ?? '').replace(/ /g, ' '))}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          (e.currentTarget as HTMLSpanElement).blur();
        }
      }}
    />
  );
}

export function EditableBody({
  value,
  onCommit,
  placeholder,
  ariaLabel,
  dir,
  className,
}: {
  value: string;
  onCommit: (v: string) => void;
  placeholder: string;
  ariaLabel?: string;
  dir?: 'ltr' | 'rtl';
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const html = value
      ? value
          .split(PARAGRAPH_SPLIT)
          .filter((p) => p.trim().length > 0)
          .map((p) => `<p>${escapeHtml(p)}</p>`)
          .join('')
      : '';
    if (ref.current.innerHTML !== html) {
      ref.current.innerHTML = html;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      ref={ref}
      role="textbox"
      aria-label={ariaLabel}
      aria-multiline="true"
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-placeholder={placeholder}
      className={`editable lh-prose ${className ?? ''}`}
      dir={dir}
      onInput={(e) => {
        const root = e.currentTarget;
        const blocks = Array.from(root.querySelectorAll('p, div'));
        const text = blocks.length
          ? blocks
              .map((b) => (b.textContent ?? '').replace(/ /g, ' ').trim())
              .filter((s) => s.length > 0)
              .join('\n\n')
          : (root.textContent ?? '').replace(/ /g, ' ');
        onCommit(text);
      }}
    />
  );
}
