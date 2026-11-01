import type { Metadata } from 'next';
import { Print } from '@/components/photo';
import { Button } from '@/components/ui/button';
import { images } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Back soon',
  robots: { index: false, follow: false },
};

/** A closed-for-now page. Point the domain or a redirect here while the studio is away. */
export default function AwayPage() {
  const { away } = images;
  return (
    <section className="ks-section ks-section-still">
      <div className="ks-content ks-away">
        <div className="ks-away-photo">
          <Print image={away.image} holder={away.holder} note={away.note} tilt={away.tilt} sizes="260px" priority />
        </div>
        <p className="pa-label-caps ks-wood">Back soon</p>
        <h1 className="pa-display">We’re out on a shoot.</h1>
        <p className="pa-lead">The studio is closed until [date]. Bookings and album orders open again then, and every message gets an answer the week we are back.</p>
        <Button asChild variant="secondary">
          <a href={`mailto:${site.email}`}>Write to {site.emailLabel}</a>
        </Button>
      </div>
    </section>
  );
}
