'use client';

// Letterhead studio. Uses the shared StudioWorkshop chrome — this file owns only
// what's specific to a letter: draft shape, paper layout, templates.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Editable, EditableBody } from './Editable';
import { StudioWorkshop, type SaveState } from './StudioWorkshop';
import { LETTER_TEMPLATES } from '@/content/studio-templates/letters';
import { loadSealed, recordSealedLetter, type LetterPayload, type Locale, type SealedDocument } from '@/lib/studio/sealed';
import type { PaletteAction } from './CommandPalette';

const DRAFT_KEY = 'khatib-studio-letter-draft-v3';
const SAVE_DEBOUNCE_MS = 500;

interface Draft extends LetterPayload {
  locale: Locale;
}

function todayString(locale: Locale): string {
  const fmt = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-LB' : 'en-GB', {
    timeZone: 'Asia/Beirut',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return fmt.format(new Date());
}

function defaultRef(): string {
  const year = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Beirut', year: 'numeric' }).format(new Date());
  return `MK-${year}-${Math.floor(Math.random() * 900 + 100)}`;
}

const INITIAL: Draft = {
  locale: 'en',
  ref: defaultRef(),
  date: todayString('en'),
  re: '',
  salutation: '',
  body: '',
  signoff: '',
};

export function LetterStudio({ userEmail }: { userEmail: string }) {
  const [draft, setDraft] = useState<Draft>(INITIAL);
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [sealedCount, setSealedCount] = useState(0);
  const [sealedRefresh, setSealedRefresh] = useState(0);
  const draftRef = useRef(draft);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedFlashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  draftRef.current = draft;
  const isAr = draft.locale === 'ar';

  // Hydrate
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDraft({ ...INITIAL, ...(JSON.parse(saved) as Draft) });
    } catch {
      /* corrupt — ignore */
    }
    setSealedCount(loadSealed().filter((e) => e.kind === 'letter').length);
    setHydrated(true);
  }, []);

  const scheduleSave = useCallback(() => {
    setSaveState('saving');
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draftRef.current));
        setSaveState('saved');
        if (savedFlashTimeout.current) clearTimeout(savedFlashTimeout.current);
        savedFlashTimeout.current = setTimeout(() => setSaveState('idle'), 1400);
      } catch {
        setSaveState('idle');
      }
    }, SAVE_DEBOUNCE_MS);
  }, []);

  const update = useCallback(<K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    scheduleSave();
  }, [scheduleSave]);

  const setLocale = useCallback((next: Locale) => {
    setDraft((d) => ({
      ...d,
      locale: next,
      date: d.date === todayString(d.locale) ? todayString(next) : d.date,
    }));
    scheduleSave();
  }, [scheduleSave]);

  const applyTemplate = useCallback((id: string) => {
    const tpl = LETTER_TEMPLATES.find((t) => t.id === id);
    if (!tpl) return;
    setDraft((d) => ({ ...d, ...tpl.apply(d.locale) }));
    scheduleSave();
  }, [scheduleSave]);

  const insertToday = useCallback(() => {
    setDraft((d) => ({ ...d, date: todayString(d.locale) }));
    scheduleSave();
  }, [scheduleSave]);

  const refreshRef = useCallback(() => {
    setDraft((d) => ({ ...d, ref: defaultRef() }));
    scheduleSave();
  }, [scheduleSave]);

  const clearDraft = useCallback(() => {
    if (!confirm(isAr ? 'مسح المسودة الحالية؟' : 'Clear the current draft? This cannot be undone.')) return;
    setDraft({ ...INITIAL, ref: defaultRef(), date: todayString(INITIAL.locale) });
    scheduleSave();
  }, [isAr, scheduleSave]);

  const onSeal = useCallback(() => {
    const c = draftRef.current;
    recordSealedLetter(c.locale, {
      ref: c.ref,
      date: c.date,
      re: c.re,
      salutation: c.salutation,
      body: c.body,
      signoff: c.signoff,
    });
    setSealedCount((n) => n + 1);
    setSealedRefresh((n) => n + 1);
    return true;
  }, []);

  const onRestore = useCallback((entry: SealedDocument) => {
    if (entry.kind !== 'letter') {
      // Cross-kind restore: navigate to the right studio. localStorage hand-off via session.
      sessionStorage.setItem('khatib-studio-restore-pending', JSON.stringify(entry));
      window.location.href = entry.kind === 'capability' ? '/studio/capability' : '/studio';
      return;
    }
    setDraft({ locale: entry.locale, ...entry.payload });
    scheduleSave();
  }, [scheduleSave]);

  // Cross-studio restore handoff: pick up if dashboard or sibling studio sent us here.
  useEffect(() => {
    const pending = sessionStorage.getItem('khatib-studio-restore-pending');
    if (!pending) return;
    try {
      const entry = JSON.parse(pending) as SealedDocument;
      if (entry.kind === 'letter') {
        setDraft({ locale: entry.locale, ...entry.payload });
        scheduleSave();
      }
    } catch {
      /* ignore */
    }
    sessionStorage.removeItem('khatib-studio-restore-pending');
  }, [scheduleSave]);

  const extraPalette = useMemo<PaletteAction[]>(() => [
    ...LETTER_TEMPLATES.map((t) => ({
      id: `template:${t.id}`,
      label: t.label,
      group: 'Templates',
      keywords: 'template letter',
      run: () => applyTemplate(t.id),
    })),
    { id: 'date:today', label: "Insert today's date", group: 'Insert', keywords: 'date today now', run: insertToday },
    { id: 'ref:new', label: 'Generate new reference', group: 'Insert', keywords: 'ref reference number', run: refreshRef },
    {
      id: 'goto:capability',
      label: 'Switch to Capability Statement',
      group: 'Navigate',
      keywords: 'capability tender prequalification',
      run: () => { window.location.href = '/studio/capability'; },
    },
  ], [applyTemplate, insertToday, refreshRef]);

  const extraCommandBar = (
    <>
      <button type="button" className="cb-btn" onClick={insertToday} title="Insert today's date">Today</button>
      <button type="button" className="cb-btn" onClick={refreshRef} title="Generate new REF">New REF</button>
    </>
  );

  return (
    <StudioWorkshop
      toolName="LETTERHEAD"
      userEmail={userEmail}
      locale={draft.locale}
      setLocale={setLocale}
      saveState={saveState}
      sealedCount={sealedCount}
      sealedRefresh={sealedRefresh}
      sealedKind="letter"
      onSeal={onSeal}
      onClearDraft={clearDraft}
      onRestore={onRestore}
      extraPaletteActions={extraPalette}
      extraCommandBarItems={extraCommandBar}
    >
      {hydrated ? (
        <div className="paper-stage">
          <Paper draft={draft} update={update} />
        </div>
      ) : (
        <div className="paper-loading">Loading…</div>
      )}
    </StudioWorkshop>
  );
}

function Paper({ draft, update }: { draft: Draft; update: <K extends keyof Draft>(k: K, v: Draft[K]) => void }) {
  const isAr = draft.locale === 'ar';
  return (
    <article className="paper" data-locale={draft.locale} aria-label="Letterhead">
      <header className="lh-head">
        <div className="lh-rule" />
        {isAr ? (
          <>
            <div className="lh-name-ar">د. ميلاد الخطيب</div>
            <div className="lh-sub-ar">الاستشارات الهندسية المدنية</div>
            <div className="lh-name-en" lang="en" dir="ltr">DR. MILAD KHATIB</div>
            <div className="lh-sub-en" lang="en" dir="ltr">CIVIL ENGINEERING CONSULTANCY</div>
          </>
        ) : (
          <>
            <div className="lh-name-en">DR. MILAD KHATIB</div>
            <div className="lh-sub-en">CIVIL ENGINEERING CONSULTANCY</div>
            <div className="lh-name-ar" lang="ar" dir="rtl">د. ميلاد الخطيب</div>
            <div className="lh-sub-ar" lang="ar" dir="rtl">الاستشارات الهندسية المدنية</div>
          </>
        )}
        <div style={{ height: '4mm' }} />
        <div className="lh-rule" />
      </header>

      <div className="lh-body">
        <div className="lh-meta">
          <span className="lh-meta-cell">
            <strong>REF</strong>
            <Editable key={`ref-${draft.locale}`} value={draft.ref} onCommit={(v) => update('ref', v)} placeholder="MK-YYYY-NNN" ariaLabel="Reference" />
          </span>
          <span className="lh-meta-cell">
            <strong>DATE</strong>
            <Editable key={`date-${draft.locale}`} value={draft.date} onCommit={(v) => update('date', v)} placeholder={isAr ? 'التاريخ' : 'Date'} ariaLabel="Date" />
          </span>
          <span className="lh-meta-cell">
            <strong>RE</strong>
            <Editable key={`re-${draft.locale}`} value={draft.re} onCommit={(v) => update('re', v)} placeholder={isAr ? 'الموضوع' : 'Subject'} ariaLabel="Subject" dir={isAr ? 'rtl' : 'ltr'} />
          </span>
        </div>

        <div className="lh-salutation">
          <Editable
            key={`sal-${draft.locale}`}
            value={draft.salutation}
            onCommit={(v) => update('salutation', v)}
            placeholder={isAr ? 'حضرة المهندس الكريم،' : 'Dear Counsel,'}
            ariaLabel="Salutation"
            dir={isAr ? 'rtl' : 'ltr'}
          />
        </div>

        <EditableBody
          key={`body-${draft.locale}`}
          value={draft.body}
          onCommit={(v) => update('body', v)}
          placeholder={isAr ? 'ابدأ.' : 'Begin.'}
          ariaLabel="Letter body"
          dir={isAr ? 'rtl' : 'ltr'}
        />

        <div className="lh-signoff">
          {(draft.signoff || isAr) && (
            <div style={{ marginBottom: '4mm' }}>
              <Editable
                key={`signoff-${draft.locale}`}
                value={draft.signoff}
                onCommit={(v) => update('signoff', v)}
                placeholder={isAr ? 'تفضّلوا بقبول فائق الاحترام.' : ''}
                ariaLabel="Closing"
                dir={isAr ? 'rtl' : 'ltr'}
              />
            </div>
          )}
          <div className="lh-signature">{isAr ? 'د. ميلاد الخطيب' : 'M. Khatib'}</div>
          <div className="lh-sig-line">{isAr ? 'دكتوراه · مهندس استشاري' : 'Dr. Milad Khatib · PhD, Eng.'}</div>
          {isAr ? (
            <div className="lh-sig-sub">عضو في نقابة المهندسين في بيروت &nbsp;·&nbsp; منذ كانون الثاني ١٩٩٩</div>
          ) : (
            <>
              <div className="lh-sig-sub">Principal · Civil Engineering Consultancy</div>
              <div className="lh-sig-sub">OEA Beirut · Member since January 1999</div>
            </>
          )}
        </div>
      </div>

      <Footer />
      <div className="paper-seal" aria-hidden="true" />
    </article>
  );
}

function Footer() {
  return (
    <footer className="lh-foot">
      <div>
        <div className="lh-foot-h">Practice</div>
        <div><strong>Beirut</strong>&nbsp;·&nbsp;Lebanon</div>
        <div>milad@miladkhatib.com</div>
        <div>+961 3 927 934</div>
      </div>
      <div>
        <div className="lh-foot-h">Registration</div>
        <div><strong>OEA · Beirut</strong>&nbsp;·&nbsp;Member since 1999</div>
        <div><strong>ORCID</strong>&nbsp;·&nbsp;0000-0002-0140-0941</div>
        <div><strong>Scopus</strong>&nbsp;·&nbsp;57202890131</div>
      </div>
      <div>
        <div className="lh-foot-h">Patents</div>
        <div><strong>LB · 2023</strong>&nbsp;·&nbsp;Solid-waste vessel</div>
        <div><strong>LB · 2025</strong>&nbsp;·&nbsp;Food-particle device</div>
        <div>miladkhatib.com</div>
      </div>
    </footer>
  );
}
