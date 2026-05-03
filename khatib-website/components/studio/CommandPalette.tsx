'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export interface PaletteAction {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
}) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter((a) => `${a.label} ${a.keywords ?? ''} ${a.group}`.toLowerCase().includes(q));
  }, [query, actions]);

  const grouped = useMemo(() => {
    const groups = new Map<string, PaletteAction[]>();
    for (const a of filtered) {
      const list = groups.get(a.group) ?? [];
      list.push(a);
      groups.set(a.group, list);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  useEffect(() => {
    if (activeIndex >= filtered.length) setActiveIndex(Math.max(0, filtered.length - 1));
  }, [filtered, activeIndex]);

  function onKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const action = filtered[activeIndex];
      if (action) {
        action.run();
        onClose();
      }
    }
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="palette-overlay no-print"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      onKeyDown={onKey}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="palette">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command, template, or jump to…"
          className="palette-input"
          autoComplete="off"
          spellCheck={false}
        />
        {filtered.length === 0 ? (
          <div className="palette-empty">No matches</div>
        ) : (
          <ul className="palette-list" role="listbox">
            {grouped.map(([group, items]) => (
              <li key={group}>
                <div className="palette-group-h">{group}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {items.map((item) => {
                    const flatIndex = filtered.indexOf(item);
                    const isActive = flatIndex === activeIndex;
                    return (
                      <li
                        key={item.id}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        className="palette-item"
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                        onClick={() => {
                          item.run();
                          onClose();
                        }}
                      >
                        <span>{item.label}</span>
                        {item.hint && <span className="palette-item-hint">{item.hint}</span>}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
