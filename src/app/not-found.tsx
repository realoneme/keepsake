import type { Metadata } from 'next';
import Link from 'next/link';
import { Print } from '@/components/photo';
import { Button } from 'paper-album-ui';
import { images } from '@/content/images';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  const [pocket, print] = images.notFound;
  return (
    <section className="ks-section ks-section-still">
      <div className="ks-content ks-split ks-split-even">
        <div className="ks-fallen">
          <div className="ks-fallen-pocket">
            <Print image={pocket.image} holder={pocket.holder} note={pocket.note} sizes="300px" />
          </div>
          <div className="ks-fallen-print">
            <Print image={print.image} holder={print.holder} note={print.note} tilt={print.tilt} sizes="190px" />
          </div>
        </div>
        <div className="ks-heading">
          <p className="pa-label-caps ks-wood">Error 404</p>
          <h1 className="pa-display">This page slipped out of the album.</h1>
          <p className="pa-lead">It may have moved, or the link has a typo. The albums are all still here.</p>
          <div className="ks-actions">
            <Button asChild>
              <Link href="/">Back to the start</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/albums">See the albums</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
