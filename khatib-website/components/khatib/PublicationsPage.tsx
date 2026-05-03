'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { PublicationItem, type PublicationType } from './PublicationItem';
import { publications, totalCount } from '@/content/publications';

const TOPIC_ORDER = ['post-tension', 'geotech', 'water', 'sustainable', 'seismic', 'other'] as const;
const TYPE_ORDER: PublicationType[] = ['journal', 'book-chapter', 'conference', 'book', 'thesis'];

export function PublicationsPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  const [topic, setTopic] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const p of publications) set.add(p.year);
    return [...set].sort((a, b) => b - a);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return publications
      .filter((p) => (topic ? p.topics.includes(topic) : true))
      .filter((p) => (year ? String(p.year) === year : true))
      .filter((p) => (type ? p.type === type : true))
      .filter((p) => (q ? p.title.toLowerCase().includes(q) : true))
      .sort((a, b) => b.year - a.year || b.num - a.num);
  }, [topic, year, type, search]);

  const book = publications.find((p) => p.isBook);

  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
            {isAr ? 'السجل الكامل' : 'Full record'}
          </Mono>
          <h1 className="font-display text-4xl font-semibold leading-tight text-cream md:text-6xl">
            {dict.publications.title}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-warm-gray md:text-xl">
            {dict.publications.lede}
          </p>
          <p className="mt-6 font-mono text-sm uppercase tracking-tracked text-gold">
            {dict.publications.stats}
          </p>
        </div>
      </header>

      {book && (
        <section className="border-b border-warm-gray/15 bg-navy/30 px-4 py-10 md:px-8 md:py-14">
          <div className="mx-auto max-w-7xl">
            <Mono className="mb-3 block text-[11px] uppercase tracking-tracked text-gold">
              {isAr ? 'كتاب' : 'Book'} · {book.year}
            </Mono>
            <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
              {book.title}
            </h2>
            <p className="mt-2 italic text-warm-gray">{book.venue}</p>
            <a
              href="https://www.amazon.in/-/hi/M-S-Khatib-ebook/dp/B0FZ5XV829"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-tracked text-gold hover:underline"
            >
              {isAr ? 'اطّلع على الكتاب على أمازون ←' : 'View book on Amazon →'}
            </a>
          </div>
        </section>
      )}

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr] md:gap-12 md:px-8 md:py-16">
        <aside className="md:sticky md:top-24 md:h-fit">
          <Mono className="mb-4 block text-[11px] uppercase tracking-tracked text-gold">
            {isAr ? 'تصفية' : 'Filter'}
          </Mono>
          <div className="flex flex-col gap-6">
            <FilterSelect
              label={dict.publications.filters.topic}
              value={topic}
              onChange={setTopic}
              all={dict.publications.filters.all}
              options={TOPIC_ORDER.map((t) => ({
                value: t,
                label: dict.publications.topics[t] ?? t,
              }))}
            />
            <FilterSelect
              label={dict.publications.filters.year}
              value={year}
              onChange={setYear}
              all={dict.publications.filters.all}
              options={years.map((y) => ({ value: String(y), label: String(y) }))}
            />
            <FilterSelect
              label={dict.publications.filters.type}
              value={type}
              onChange={setType}
              all={dict.publications.filters.all}
              options={TYPE_ORDER.map((t) => ({
                value: t,
                label: dict.publications.types[t] ?? t,
              }))}
            />
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-tracked text-gold">
                {dict.publications.filters.search}
              </span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-sm text-cream placeholder:text-warm-gray/50 focus:border-gold"
                placeholder={dict.publications.filters.search}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                setTopic('');
                setYear('');
                setType('');
                setSearch('');
              }}
              className="self-start font-mono text-[11px] uppercase tracking-tracked text-warm-gray hover:text-gold"
            >
              {dict.publications.filters.clear}
            </button>
            <p className="font-mono text-[11px] uppercase tracking-tracked text-warm-gray">
              {filtered.length} / {totalCount}
            </p>
          </div>
        </aside>

        <section>
          {filtered.length === 0 ? (
            <p className="text-warm-gray">{dict.publications.filters.noResults}</p>
          ) : (
            filtered.map((pub) => (
              <PublicationItem
                key={pub.num}
                pub={pub}
                topicLabels={dict.publications.topics}
                typeLabels={dict.publications.types}
                doiLabel={dict.publications.doiLabel}
                viewLabel={dict.publications.viewVenue}
              />
            ))
          )}
        </section>
      </div>
    </article>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  all,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  all: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-tracked text-gold">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-warm-gray/30 bg-deep-navy/60 px-3 py-2 text-sm text-cream focus:border-gold"
      >
        <option value="">{all}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
