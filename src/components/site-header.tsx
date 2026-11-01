'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { nav, site } from '@/content/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="ks-header">
      <div className="ks-header-bar">
        <Link href="/" className="ks-brand" onClick={close}>
          <span className="pa-h4">{site.name}</span>
          <span className="ks-brand-note">photographs &amp; albums</span>
        </Link>
        <nav aria-label="Main" className="ks-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Button asChild variant="seal" size="sm">
            <Link href="/book">Book a session</Link>
          </Button>
        </nav>
        <button type="button" className="ks-menu-key" aria-expanded={open} aria-controls="ks-drawer" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="ks-drawer" className="ks-drawer" data-open={open || undefined} inert={!open}>
        <nav aria-label="Menu" className="ks-drawer-inner">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="pa-h4" aria-current={isCurrent(item.href) ? 'page' : undefined} onClick={close}>
              <span>{item.label}</span>
            </Link>
          ))}
          <Button asChild variant="seal" className="ks-drawer-book">
            <Link href="/book" onClick={close}>
              Book a session
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
