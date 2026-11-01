import Link from 'next/link';
import { nav, site } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="ks-footer">
      <div className="ks-footer-inner">
        <div className="ks-footer-top">
          <div className="ks-footer-brand">
            <p className="pa-h3">{site.name}</p>
            <p>Weddings, families, portraits and any moment you want to keep, in {site.city}. Every session ends in an album you can hold.</p>
          </div>
          <nav aria-label="Visit">
            <h2 className="pa-label-caps">Visit</h2>
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Book">
            <h2 className="pa-label-caps">Book</h2>
            <Link href="/book">Book a session</Link>
            <a href={`mailto:${site.email}`}>{site.emailLabel}</a>
            <a href={`tel:${site.phone}`}>{site.phoneLabel}</a>
          </nav>
          <nav aria-label="Follow">
            <h2 className="pa-label-caps">Follow</h2>
            <a href={site.instagram}>Instagram</a>
            <a href={site.pinterest}>Pinterest</a>
          </nav>
        </div>
        <div className="ks-footer-base">
          <p>© {new Date().getFullYear()} {site.name}. All photographs belong to their families.</p>
          <p className="ks-footer-made">Keepsake template</p>
        </div>
      </div>
    </footer>
  );
}
