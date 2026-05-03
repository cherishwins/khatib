'use client';

// Capability Statement studio. 4-page A4 brand-perfect tender document.
// Uses the shared StudioWorkshop chrome.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Editable, EditableBody } from './Editable';
import { StudioWorkshop, type SaveState } from './StudioWorkshop';
import { PRACTICE_INTRO, REP_WORK } from '@/content/studio-templates/capability';
import { brand, profiles } from '@/lib/tokens';
import {
  loadSealed,
  recordSealedCapability,
  type CapabilityPayload,
  type Locale,
  type RepWork,
  type SealedDocument,
} from '@/lib/studio/sealed';
import type { PaletteAction } from './CommandPalette';

const DRAFT_KEY = 'khatib-studio-capability-draft-v2';
const SAVE_DEBOUNCE_MS = 500;

interface Draft extends CapabilityPayload {
  locale: Locale;
}

function todayString(locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-LB' : 'en-GB', {
    timeZone: 'Asia/Beirut',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

function defaultRef(): string {
  const year = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Beirut', year: 'numeric' }).format(new Date());
  return `MK-CS-${year}-${Math.floor(Math.random() * 900 + 100)}`;
}

function freshInitial(locale: Locale = 'en'): Draft {
  return {
    locale,
    ref: defaultRef(),
    date: todayString(locale),
    issuedTo: '',
    engagementContext: '',
    practiceIntro: PRACTICE_INTRO[locale],
    repWork: REP_WORK[locale].map((r) => ({ ...r })),
    contactNote: '',
  };
}

const INITIAL = freshInitial('en');

export function CapabilityStudio({ userEmail }: { userEmail: string }) {
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDraft({ ...INITIAL, ...(JSON.parse(saved) as Draft) });
    } catch {
      /* ignore */
    }
    setSealedCount(loadSealed().filter((e) => e.kind === 'capability').length);
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

  const updateRepWork = useCallback((index: number, field: keyof RepWork, value: string) => {
    setDraft((d) => {
      const next = [...d.repWork];
      next[index] = { ...next[index], [field]: value };
      return { ...d, repWork: next };
    });
    scheduleSave();
  }, [scheduleSave]);

  // Locale toggle: only swap defaults if the user hasn't customised.
  // Tracked by exact-string match with the templates module — fragile but acceptable
  // for a tool with one user; a stronger guarantee would track per-field "isDefault" flags.
  const setLocale = useCallback((next: Locale) => {
    setDraft((d) => {
      const isDefaultPractice = d.practiceIntro === PRACTICE_INTRO.en || d.practiceIntro === PRACTICE_INTRO.ar;
      const isDefaultRepWork = d.repWork.every((r, i) =>
        r.title === REP_WORK.en[i]?.title || r.title === REP_WORK.ar[i]?.title,
      );
      return {
        ...d,
        locale: next,
        date: d.date === todayString(d.locale) ? todayString(next) : d.date,
        practiceIntro: isDefaultPractice ? PRACTICE_INTRO[next] : d.practiceIntro,
        repWork: isDefaultRepWork ? REP_WORK[next].map((r) => ({ ...r })) : d.repWork,
      };
    });
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
    setDraft(freshInitial(INITIAL.locale));
    scheduleSave();
  }, [isAr, scheduleSave]);

  const onSeal = useCallback(() => {
    const c = draftRef.current;
    recordSealedCapability(c.locale, {
      ref: c.ref,
      date: c.date,
      issuedTo: c.issuedTo,
      engagementContext: c.engagementContext,
      practiceIntro: c.practiceIntro,
      repWork: c.repWork,
      contactNote: c.contactNote,
    });
    setSealedCount((n) => n + 1);
    setSealedRefresh((n) => n + 1);
    return true;
  }, []);

  // Restore. For cross-kind, we pass control to the appropriate studio via session handoff.
  const onRestore = useCallback((entry: SealedDocument) => {
    if (entry.kind !== 'capability') {
      sessionStorage.setItem('khatib-studio-restore-pending', JSON.stringify(entry));
      window.location.href = entry.kind === 'letter' ? '/studio/letter' : '/studio';
      return;
    }
    setDraft({ locale: entry.locale, ...entry.payload });
    scheduleSave();
  }, [scheduleSave]);

  // Pick up a cross-studio handoff if one was queued by a sibling.
  useEffect(() => {
    const pending = sessionStorage.getItem('khatib-studio-restore-pending');
    if (!pending) return;
    try {
      const entry = JSON.parse(pending) as SealedDocument;
      if (entry.kind === 'capability') {
        setDraft({ locale: entry.locale, ...entry.payload });
        scheduleSave();
      }
    } catch {
      /* ignore */
    }
    sessionStorage.removeItem('khatib-studio-restore-pending');
  }, [scheduleSave]);

  const extraPalette = useMemo<PaletteAction[]>(() => [
    { id: 'date:today', label: "Insert today's date", group: 'Insert', keywords: 'date today', run: insertToday },
    { id: 'ref:new', label: 'Generate new reference', group: 'Insert', keywords: 'ref reference', run: refreshRef },
    {
      id: 'goto:letter',
      label: 'Switch to Letterhead',
      group: 'Navigate',
      keywords: 'letter letterhead',
      run: () => { window.location.href = '/studio/letter'; },
    },
  ], [insertToday, refreshRef]);

  const extraCommandBar = (
    <>
      <button type="button" className="cb-btn" onClick={insertToday} title="Insert today's date">Today</button>
      <button type="button" className="cb-btn" onClick={refreshRef} title="Generate new REF">New REF</button>
    </>
  );

  return (
    <StudioWorkshop
      toolName="CAPABILITY STATEMENT"
      userEmail={userEmail}
      locale={draft.locale}
      setLocale={setLocale}
      saveState={saveState}
      sealedCount={sealedCount}
      sealedRefresh={sealedRefresh}
      sealedKind="capability"
      onSeal={onSeal}
      onClearDraft={clearDraft}
      onRestore={onRestore}
      extraPaletteActions={extraPalette}
      extraCommandBarItems={extraCommandBar}
    >
      {hydrated ? (
        <CapabilityPaper draft={draft} update={update} updateRepWork={updateRepWork} />
      ) : (
        <div className="paper-loading">Loading…</div>
      )}
    </StudioWorkshop>
  );
}

function CapabilityPaper({
  draft,
  update,
  updateRepWork,
}: {
  draft: Draft;
  update: <K extends keyof Draft>(k: K, v: Draft[K]) => void;
  updateRepWork: (index: number, field: keyof RepWork, value: string) => void;
}) {
  return (
    <div className="cs-pages" data-locale={draft.locale}>
      <CoverPage draft={draft} update={update} />
      <PracticePage draft={draft} update={update} />
      <RepWorkPage draft={draft} updateRepWork={updateRepWork} />
      <CredentialsPage draft={draft} update={update} />
    </div>
  );
}

function CoverPage({ draft, update }: { draft: Draft; update: <K extends keyof Draft>(k: K, v: Draft[K]) => void }) {
  const isAr = draft.locale === 'ar';
  return (
    <article className="paper paper-cover" data-locale={draft.locale}>
      <div className="cs-bg-grid" aria-hidden="true" />
      <header className="cs-cover-eyebrow">
        <div className="lh-rule" />
        <div className="cs-cover-eyebrow-text">{isAr ? 'بيان القدرات' : 'CAPABILITY STATEMENT'}</div>
        <div className="lh-rule" />
      </header>

      <div className="cs-cover-center">
        {isAr ? (
          <>
            <div className="cs-cover-name-ar">د. ميلاد الخطيب</div>
            <div className="cs-cover-sub-ar">الاستشارات الهندسية المدنية</div>
            <div className="cs-cover-name-en" lang="en" dir="ltr">DR. MILAD KHATIB</div>
            <div className="cs-cover-sub-en" lang="en" dir="ltr">CIVIL ENGINEERING CONSULTANCY</div>
          </>
        ) : (
          <>
            <div className="cs-cover-name-en">DR. MILAD KHATIB</div>
            <div className="cs-cover-sub-en">CIVIL ENGINEERING CONSULTANCY</div>
            <div className="cs-cover-name-ar" lang="ar" dir="rtl">د. ميلاد الخطيب</div>
            <div className="cs-cover-sub-ar" lang="ar" dir="rtl">الاستشارات الهندسية المدنية</div>
          </>
        )}
        <div className="cs-cover-tagline">{isAr ? 'الهندسة بالبرهان.' : 'Engineering by proof.'}</div>
      </div>

      <footer className="cs-cover-foot">
        <div className="lh-rule" />
        <div className="cs-cover-meta">
          <div className="cs-meta-cell">
            <div className="cs-meta-h">{isAr ? 'مُقدَّم إلى' : 'ISSUED TO'}</div>
            <Editable value={draft.issuedTo} onCommit={(v) => update('issuedTo', v)} placeholder={isAr ? '— اسم الجهة —' : '— Recipient —'} dir={isAr ? 'rtl' : 'ltr'} className="cs-meta-v" />
          </div>
          <div className="cs-meta-cell">
            <div className="cs-meta-h">{isAr ? 'السياق' : 'CONTEXT'}</div>
            <Editable value={draft.engagementContext} onCommit={(v) => update('engagementContext', v)} placeholder={isAr ? '— نوع التكليف —' : '— Engagement type —'} dir={isAr ? 'rtl' : 'ltr'} className="cs-meta-v" />
          </div>
          <div className="cs-meta-cell">
            <div className="cs-meta-h">REF</div>
            <Editable value={draft.ref} onCommit={(v) => update('ref', v)} placeholder="MK-CS-YYYY-NNN" className="cs-meta-v" />
          </div>
          <div className="cs-meta-cell">
            <div className="cs-meta-h">{isAr ? 'التاريخ' : 'DATE'}</div>
            <Editable value={draft.date} onCommit={(v) => update('date', v)} placeholder={isAr ? 'التاريخ' : 'Date'} className="cs-meta-v" />
          </div>
        </div>
      </footer>
      <div className="paper-seal" aria-hidden="true" />
    </article>
  );
}

function PracticePage({ draft, update }: { draft: Draft; update: <K extends keyof Draft>(k: K, v: Draft[K]) => void }) {
  const isAr = draft.locale === 'ar';
  return (
    <article className="paper paper-content" data-locale={draft.locale}>
      <CSHeader isAr={isAr} />
      <SectionHeading number="01" title={isAr ? 'الممارسة' : 'PRACTICE'} />
      <EditableBody
        value={draft.practiceIntro}
        onCommit={(v) => update('practiceIntro', v)}
        placeholder={isAr ? 'وصف الممارسة…' : 'Practice description…'}
        dir={isAr ? 'rtl' : 'ltr'}
        className="cs-practice-prose"
      />
      <SectionHeading number="" title={isAr ? 'الركائز الثلاث' : 'THREE PILLARS'} />
      <div className="cs-pillars">
        <Pillar n="01" title={isAr ? 'إنشائي' : 'Structural'} body={isAr
          ? 'الخرسانة سابقة الإجهاد، التسليح المعكوس، السلاسل الأحادية، تخفيف الأثر الزلزالي.'
          : 'Post-tensioned and prestressed concrete, inverted-U reinforcement, monostrand anchorage, seismic mitigation.'} />
        <Pillar n="02" title={isAr ? 'جيوتقني' : 'Geotechnical'} body={isAr
          ? 'استقرار المنحدرات، حقن السدود بطريقة GIN، الجدران الحاجزة، هندسة الموارد المائية.'
          : 'Slope stability, GIN-method dam grouting, diaphragm walls, water-resource engineering for Lebanese terrain.'} />
        <Pillar n="03" title={isAr ? 'خبرة فنية' : 'Forensic'} body={isAr
          ? 'تقارير فنية قابلة للدفاع لشركات التأمين والمكاتب القانونية والمحاكم. منهجية قبل الاستنتاج.'
          : 'Defensible technical opinions for insurers, law firms, and courts. Methodology before conclusion.'} />
      </div>
      <div className="cs-stats">
        <Stat n="52" label={isAr ? 'منشور' : 'PUBLICATIONS'} />
        <Stat n="21" label={isAr ? 'دور تحريري' : 'EDITORIAL ROLES'} />
        <Stat n="2" label={isAr ? 'براءة لبنانية' : 'PATENTS · LB'} />
        <Stat n="1" label={isAr ? 'كتاب' : 'BOOK'} />
        <Stat n="1999" label={isAr ? 'منذ — نقابة المهندسين' : 'OEA SINCE'} />
      </div>
      <CSFooter pageNum={2} />
    </article>
  );
}

function RepWorkPage({ draft, updateRepWork }: { draft: Draft; updateRepWork: (i: number, f: keyof RepWork, v: string) => void }) {
  const isAr = draft.locale === 'ar';
  return (
    <article className="paper paper-content" data-locale={draft.locale}>
      <CSHeader isAr={isAr} />
      <SectionHeading number="02" title={isAr ? 'أعمال تمثيلية' : 'REPRESENTATIVE WORK'} />
      <div className="cs-rep-list">
        {draft.repWork.map((item, i) => (
          <div key={i} className="cs-rep-item">
            <div className="cs-rep-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="cs-rep-body">
              <Editable value={item.title} onCommit={(v) => updateRepWork(i, 'title', v)} placeholder={isAr ? 'عنوان' : 'Title'} dir={isAr ? 'rtl' : 'ltr'} className="cs-rep-title" />
              <div className="cs-rep-fields">
                <div className="cs-rep-field">
                  <span className="cs-rep-label">{isAr ? 'النطاق' : 'SCOPE'}</span>
                  <Editable value={item.scope} onCommit={(v) => updateRepWork(i, 'scope', v)} placeholder={isAr ? 'نطاق العمل…' : 'Scope of work…'} dir={isAr ? 'rtl' : 'ltr'} className="cs-rep-text" />
                </div>
                <div className="cs-rep-field">
                  <span className="cs-rep-label">{isAr ? 'المنهجية' : 'METHODOLOGY'}</span>
                  <Editable value={item.methodology} onCommit={(v) => updateRepWork(i, 'methodology', v)} placeholder={isAr ? 'مرجع المنهجية / DOI' : 'Reference / DOI'} className="cs-rep-text cs-rep-mono" />
                </div>
                <div className="cs-rep-field">
                  <span className="cs-rep-label">{isAr ? 'النتيجة' : 'OUTCOME'}</span>
                  <Editable value={item.outcome} onCommit={(v) => updateRepWork(i, 'outcome', v)} placeholder={isAr ? 'النتيجة المحقّقة…' : 'Outcome achieved…'} dir={isAr ? 'rtl' : 'ltr'} className="cs-rep-text" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CSFooter pageNum={3} />
    </article>
  );
}

function CredentialsPage({ draft, update }: { draft: Draft; update: <K extends keyof Draft>(k: K, v: Draft[K]) => void }) {
  const isAr = draft.locale === 'ar';
  return (
    <article className="paper paper-content" data-locale={draft.locale}>
      <CSHeader isAr={isAr} />
      <SectionHeading number="03" title={isAr ? 'المؤهّلات' : 'CREDENTIALS'} />
      <div className="cs-cred-grid">
        <div>
          <h4 className="cs-cred-h">{isAr ? 'التعليم' : 'EDUCATION'}</h4>
          <ul className="cs-cred-list">
            <li>{isAr ? 'دكتوراه · الإنشائية والجيوتقنية · جامعة بيروت العربية · ٢٠١٨' : 'PhD · Structural & Geotechnical · BAU · 2018'}</li>
            <li>{isAr ? 'ماجستير · الهندسة المدنية · جامعة بيروت العربية · ٢٠٠٥' : 'M.Sc. · Civil Engineering · BAU · 2005'}</li>
            <li>{isAr ? 'بكالوريوس · الهندسة المدنية · جامعة بيروت العربية · ١٩٩٨' : 'B.Sc. · Civil Engineering · BAU · 1998'}</li>
            <li>{isAr ? 'ماجستير في إدارة الأعمال · الجامعة الأميركية للعلوم والتكنولوجيا · قيد الإكمال' : 'MBA · AUST · in progress'}</li>
          </ul>
        </div>
        <div>
          <h4 className="cs-cred-h">{isAr ? 'العضوية' : 'MEMBERSHIPS'}</h4>
          <ul className="cs-cred-list">
            <li>{isAr ? 'نقابة المهندسين في بيروت · منذ ١٩٩٩' : 'OEA Beirut · Member since 1999'}</li>
            <li>{isAr ? 'سفير الاستدامة SPSC · ٠٠٠١٤٧٧٤' : 'SPSC Sustainability Ambassador · 00014774'}</li>
            <li>ACSE</li>
            <li>{isAr ? 'هيئات تحرير في ٢١ مجلة دولية' : 'Editorial boards · 21 international journals'}</li>
          </ul>
        </div>
        <div>
          <h4 className="cs-cred-h">{isAr ? 'اللغات' : 'LANGUAGES'}</h4>
          <ul className="cs-cred-list">
            <li>{isAr ? 'العربية · اللغة الأم' : 'Arabic · Native'}</li>
            <li>{isAr ? 'الإنكليزية · متمكّن' : 'English · Fluent'}</li>
            <li>{isAr ? 'الفرنسية · متمكّن' : 'French · Fluent'}</li>
            <li>{isAr ? 'الإيطالية · متوسط' : 'Italian · Intermediate'}</li>
          </ul>
        </div>
        <div>
          <h4 className="cs-cred-h">{isAr ? 'البرمجيات' : 'SOFTWARE'}</h4>
          <ul className="cs-cred-list">
            <li>MATLAB · ANSYS · ABAQUS</li>
            <li>ETABS · AutoCAD</li>
            <li>PLAXIS · Primavera P6</li>
          </ul>
        </div>
        <div>
          <h4 className="cs-cred-h">{isAr ? 'الملفات الأكاديمية' : 'ACADEMIC PROFILES'}</h4>
          <ul className="cs-cred-list cs-cred-mono">
            <li>ORCID · {profiles.orcid}</li>
            <li>Scopus · {profiles.scopus}</li>
            <li>ResearchGate · {profiles.researchgate}</li>
          </ul>
        </div>
        <div>
          <h4 className="cs-cred-h">{isAr ? 'تواصل' : 'CONTACT'}</h4>
          <ul className="cs-cred-list">
            <li>{brand.email}</li>
            <li>{brand.phoneCandidate}</li>
            <li>{brand.city} · {isAr ? 'لبنان' : brand.country}</li>
            <li><a href={`https://${brand.domain}`}>{brand.domain}</a></li>
          </ul>
        </div>
      </div>
      <div className="cs-contact-note">
        <div className="cs-cred-h">{isAr ? 'ملاحظة لهذا التكليف' : 'NOTE FOR THIS ENGAGEMENT'}</div>
        <EditableBody value={draft.contactNote} onCommit={(v) => update('contactNote', v)} placeholder={isAr ? 'ملاحظة اختيارية لهذا التكليف…' : 'Optional note for this engagement…'} dir={isAr ? 'rtl' : 'ltr'} className="cs-contact-note-body" />
      </div>
      <CSFooter pageNum={4} />
    </article>
  );
}

function CSHeader({ isAr }: { isAr: boolean }) {
  return (
    <header className="cs-page-head">
      <div className="cs-page-head-l">DR. MILAD KHATIB</div>
      <div className="cs-page-head-r">{isAr ? 'بيان قدرات' : 'CAPABILITY STATEMENT'}</div>
    </header>
  );
}

function CSFooter({ pageNum }: { pageNum: number }) {
  return (
    <footer className="cs-page-foot">
      <div className="cs-page-foot-l">miladkhatib.com</div>
      <div className="cs-page-foot-r">{pageNum} / 4</div>
    </footer>
  );
}

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="cs-sec-h">
      {number && <span className="cs-sec-num">{number}</span>}
      <span className="cs-sec-rule" />
      <span className="cs-sec-title">{title}</span>
    </div>
  );
}

function Pillar({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="cs-pillar">
      <div className="cs-pillar-num">{n}</div>
      <div className="cs-pillar-title">{title}</div>
      <div className="cs-pillar-body">{body}</div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="cs-stat">
      <div className="cs-stat-n">{n}</div>
      <div className="cs-stat-l">{label}</div>
    </div>
  );
}
