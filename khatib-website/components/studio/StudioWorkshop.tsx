'use client';

// StudioWorkshop — shared chrome for every document studio.
//
// Wraps the document paper. Owns:
//   • Top bar: brand wordmark + tool name + saved state + sealed count + dashboard link + sign-out
//   • Command bar: EN/AR toggle + extra studio-specific buttons + "Seal & Export"
//   • Command palette (⌘K): every action discoverable via search
//   • Sealed-documents drawer (⌘O): filtered to this studio's kind
//   • Keyboard: ⌘K, ⌘L (locale toggle), ⌘P (seal), ⌘O (drawer), Esc (close palette)
//   • Save state machine (idle/saving/saved with auto-fade)
//   • Seal animation: gold rule sweep + soft thunk, gated by prefers-reduced-motion
//
// The studio supplies: locale state, save scheduling, seal recorder, restore handler,
// and any extra palette/command-bar items.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CommandPalette, type PaletteAction } from './CommandPalette';
import { SealedDrawer } from './SealedDrawer';
import { playSealSound, prefersReducedMotion } from '@/lib/studio/motion';
import type { DocumentKind, Locale, SealedDocument } from '@/lib/studio/sealed';

const COMMAND_BAR_IDLE_MS = 2400;
const SAVE_FLASH_MS = 1400;

export type SaveState = 'idle' | 'saving' | 'saved';

export interface StudioWorkshopProps {
  toolName: string; // "LETTERHEAD" / "CAPABILITY STATEMENT"
  userEmail: string;

  locale: Locale;
  setLocale: (l: Locale) => void;

  saveState: SaveState;
  sealedCount: number;
  sealedRefresh: number; // bump to refresh drawer contents
  sealedKind: DocumentKind;
  onRestore: (entry: SealedDocument) => void;

  // Returns true if the studio actually sealed (and we should animate). False to abort
  // (e.g. validation failure). The wrapper handles sound + animation + opening print.
  onSeal: () => boolean | void;

  onClearDraft: () => void;

  extraPaletteActions?: PaletteAction[];
  extraCommandBarItems?: React.ReactNode;

  children: React.ReactNode;
}

export function StudioWorkshop(props: StudioWorkshopProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sealedOpen, setSealedOpen] = useState(false);
  const [sealing, setSealing] = useState(false);
  const [commandBarVisible, setCommandBarVisible] = useState(true);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const localeRef = useRef(props.locale);
  localeRef.current = props.locale;

  const seal = useCallback(() => {
    if (sealing) return;
    const result = props.onSeal();
    if (result === false) return;
    setSealing(true);
    playSealSound();
    const reduced = prefersReducedMotion();
    const sweepMs = reduced ? 0 : 380;
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setSealing(false), 600);
    }, sweepMs);
  }, [sealing, props]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (meta && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        seal();
      } else if (meta && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        props.setLocale(localeRef.current === 'en' ? 'ar' : 'en');
      } else if (meta && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setSealedOpen((v) => !v);
      } else if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [seal, props, paletteOpen]);

  // Command bar idle timer — fades out after inactivity, returns on movement.
  useEffect(() => {
    function show() {
      setCommandBarVisible(true);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setCommandBarVisible(false), COMMAND_BAR_IDLE_MS);
    }
    show();
    document.addEventListener('mousemove', show);
    document.addEventListener('keydown', show);
    return () => {
      document.removeEventListener('mousemove', show);
      document.removeEventListener('keydown', show);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  const isAr = props.locale === 'ar';

  // Standard palette actions every studio gets, plus the studio's extras.
  const paletteActions = useMemo<PaletteAction[]>(
    () => [
      { id: 'lang:en', label: 'Switch to English', group: 'Language', hint: '⌘L', keywords: 'english', run: () => props.setLocale('en') },
      { id: 'lang:ar', label: 'Switch to Arabic / العربية', group: 'Language', hint: '⌘L', keywords: 'arabic عربية', run: () => props.setLocale('ar') },
      ...(props.extraPaletteActions ?? []),
      { id: 'seal', label: 'Seal & export PDF', group: 'Export', hint: '⌘P', keywords: 'print export pdf seal save', run: seal },
      { id: 'sealed', label: 'View sealed documents', group: 'Export', hint: '⌘O', keywords: 'sealed history sent log open', run: () => setSealedOpen(true) },
      { id: 'goto:dashboard', label: 'Studio dashboard', group: 'Navigate', keywords: 'home dashboard back', run: () => { window.location.href = '/studio'; } },
      { id: 'clear', label: 'Clear draft', group: 'Manage', keywords: 'reset clear delete', run: props.onClearDraft },
      {
        id: 'logout', label: 'Sign out', group: 'Manage', keywords: 'logout exit',
        run: () => {
          const form = document.createElement('form');
          form.method = 'post';
          form.action = '/api/studio/logout';
          document.body.appendChild(form);
          form.submit();
        },
      },
    ],
    [props, seal],
  );

  // Provide sealing state to descendants via data-attribute on a wrapper around children.
  // The paper reads .paper[data-sealing="true"] to trigger the gold-rule sweep.
  return (
    <div className="workshop">
      <div className="workshop-top no-print">
        <div className="workshop-brand">
          KHATIB STUDIO
          <span className="workshop-brand-rule" />
          {props.toolName}
        </div>
        <div className="workshop-meta">
          <span className="workshop-saved" data-state={props.saveState} aria-live="polite">
            <span className="workshop-saved-dot" />
            {props.saveState === 'saving' ? 'SAVING' : props.saveState === 'saved' ? 'SAVED' : 'AUTO-SAVE'}
          </span>
          <button
            type="button"
            className="workshop-sealed"
            onClick={() => setSealedOpen(true)}
            title="Sealed documents (⌘O)"
          >
            <span className="workshop-sealed-count">{props.sealedCount}</span> SEALED
          </button>
          <Link href="/studio">DASHBOARD</Link>
          <button type="button" onClick={() => setPaletteOpen(true)} title="Command palette (⌘K)">
            ⌘K
          </button>
          <span title={`Signed in as ${props.userEmail}`}>{props.userEmail.split('@')[0]}</span>
          <form action="/api/studio/logout" method="post" style={{ display: 'inline' }}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </div>

      <div className="workshop-canvas" data-sealing={sealing}>
        {props.children}
      </div>

      <div className="command-bar no-print" data-visible={commandBarVisible || paletteOpen}>
        <button type="button" className="cb-btn" data-active={!isAr} onClick={() => props.setLocale('en')} title="English (⌘L)">
          EN
        </button>
        <button type="button" className="cb-btn" data-active={isAr} onClick={() => props.setLocale('ar')} title="Arabic (⌘L)">
          AR
        </button>
        <span className="cb-divider" />
        <button type="button" className="cb-btn" onClick={() => setPaletteOpen(true)} title="Command palette">
          Actions <span className="cb-kbd">⌘K</span>
        </button>
        {props.extraCommandBarItems}
        <span className="cb-divider" />
        <button type="button" className="cb-btn cb-btn-primary" onClick={seal} title="Seal & export PDF">
          Seal &amp; Export <span className="cb-kbd">⌘P</span>
        </button>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={paletteActions} />
      <SealedDrawer
        open={sealedOpen}
        onClose={() => setSealedOpen(false)}
        onRestore={props.onRestore}
        refreshKey={props.sealedRefresh}
        filterKind={props.sealedKind}
      />
    </div>
  );
}
