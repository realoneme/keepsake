import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site, siteUrl } from '@/content/site';
import { caveat, fraunces, instrumentSans } from '@/styles/fonts';
import 'paper-album-ui/styles.css';
import '@/styles/site.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name} · ${site.eyebrow}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', images: [{ url: '/images/product/open-album.jpg' }] },
};

export const viewport: Viewport = { themeColor: '#ede2c8' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="parchment" className={`${fraunces.variable} ${instrumentSans.variable} ${caveat.variable}`}>
      <body>
        <a className="ks-skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
