'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** A row that scrolls sideways, with two paper arrow keys and a soft fade on the edge that has more to show. */
export function ScrollRow({ label, children }: { label: string; children: ReactNode }) {
  const row = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setEnds((was) => (was.start === start && was.end === end ? was : { start, end }));
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const go = (direction: 1 | -1) => row.current?.scrollBy({ left: direction * row.current.clientWidth * 0.85, behavior: 'smooth' });

  return (
    <div className="ks-scroll" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={row}
        className="ks-scroll-row"
        data-start={ends.start || undefined}
        data-end={ends.end || undefined}
        tabIndex={0}
        onScroll={measure}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            go(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            go(-1);
          }
        }}
      >
        {children}
      </div>
      {ends.start && ends.end ? null : (
        <div className="ks-scroll-keys">
          <button type="button" aria-label="Previous albums" disabled={ends.start} onClick={() => go(-1)}>
            <ChevronLeft className="pa-i" aria-hidden />
          </button>
          <button type="button" aria-label="Next albums" disabled={ends.end} onClick={() => go(1)}>
            <ChevronRight className="pa-i" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
