import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AlbumCard } from '@/components/album-card';
import { Heading } from '@/components/heading';
import { PaperBanner } from '@/components/paper-banner';
import { Print } from '@/components/photo';
import { ScrollRow } from '@/components/scroll-row';
import { Button } from 'paper-album-ui';
import { featuredAlbums } from '@/content/albums';
import { images } from '@/content/images';
import { testimonials } from '@/content/testimonials';

const sessions = [
  { title: 'Weddings', image: images.sessions.Weddings, body: 'The whole day, from the first coffee to the last dance, with a second photographer.', price: 'from $3,800' },
  { title: 'Families', image: images.sessions.Families, body: 'Two slow hours at home or somewhere you love. Children run, nobody poses.', price: 'from $750' },
  { title: 'Portraits', image: images.sessions.Portraits, body: 'One hour, one place, for you or for two. Book jackets, graduations, birthdays.', price: 'from $450' },
];

const facts = ['Three sizes, from 20 × 25 to 30 × 30 cm', 'Linen or leather covers, debossed with your names', '30 to 100 pages, laid flat so no photo is lost in the fold'];

export default function HomePage() {
  return (
    <>
      <PaperBanner />

      <section className="ks-section ks-section-after-hero">
        <div className="ks-content ks-stack-head">
          <div className="ks-heading-row">
            <Heading label="Recent albums" title="Bound this year" />
            <Button asChild variant="secondary" className="ks-heading-action">
              <Link href="/albums">
                All albums
                <ArrowRight className="pa-i sm" aria-hidden />
              </Link>
            </Button>
          </div>
          <ScrollRow label="Recent albums">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.slug} album={album} holder="corners" sizes="300px" />
            ))}
          </ScrollRow>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-stack-head">
          <Heading
            label="Sessions"
            title="Weddings, families, portraits, and any moment you want to keep"
            lead="These are the sessions we book most, not the only ones. Whatever the day, it ends the same way: a sequence of prints you choose together, bound into an album."
          />
          <div className="ks-sessions">
            <div className="ks-session-cards">
              {sessions.map((session) => (
                <Link key={session.title} href="/services" className="ks-session">
                  <Print image={session.image} holder="slits" ratio="3 / 2" sizes="(max-width: 809px) 100vw, (max-width: 1199px) 45vw, 340px" />
                  <div className="ks-session-text">
                    <h3 className="pa-h3">{session.title}</h3>
                    <p className="ks-body ks-muted">{session.body}</p>
                    <p className="ks-note-sm ks-seal">{session.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="ks-also">
              <p className="pa-note ks-seal ks-tilt">and also</p>
              <p className="ks-ui">Engagements, maternity and newborns, birthdays, small celebrations, brand portraits.</p>
              <Button asChild variant="ghost">
                <Link href="/book">
                  Ask about your day
                  <ArrowRight className="pa-i sm" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-feature">
          <div className="ks-product">
            <Image src={images.product.open.src} width={images.product.open.width} height={images.product.open.height} alt={images.product.open.alt} sizes="(max-width: 1199px) 45vw, 240px" />
            <Image src={images.product.spine.src} width={images.product.spine.width} height={images.product.spine.height} alt={images.product.spine.alt} sizes="(max-width: 1199px) 45vw, 240px" />
          </div>
          <div className="ks-feature-text">
            <p className="pa-label-caps ks-wood">Printed albums</p>
            <h2 className="pa-h1">
              Your photographs deserve more than <em>a folder.</em>
            </h2>
            <p className="ks-body ks-muted">We design every album with you, print it on archival cotton paper and bind it in linen. Order one with your session, or bring photographs from years ago.</p>
            <ol className="ks-facts">
              {facts.map((fact, i) => (
                <li key={fact}>
                  <span className="pa-note ks-seal">{i + 1}</span>
                  <span className="ks-ui">{fact}</span>
                </li>
              ))}
            </ol>
            <div className="ks-actions">
              <Button asChild>
                <Link href="/printed-albums">Design your album</Link>
              </Button>
              <p className="ks-note-sm ks-wood ks-tilt">ships in 4 weeks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-stack-head">
          <Heading label="Kind words" title="From the people in the photographs" />
          <div className="ks-cards ks-cards-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="ks-quote">
                <p className="ks-quote-mark" aria-hidden="true">
                  “
                </p>
                <blockquote className="pa-lead">{item.quote}</blockquote>
                <figcaption>
                  <Image src={item.photo.src} width={88} height={88} alt="" />
                  <span>
                    <span className="ks-small">{item.name}</span>
                    <span className="pa-caption">{item.session}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section ks-section-last">
        <div className="ks-content ks-cta">
          <h2 className="pa-display">
            Let’s make something <em>you’ll keep.</em>
          </h2>
          <p className="pa-lead">Tell us the date and the place. We reply within two days with what we have free.</p>
          <Button asChild variant="seal">
            <Link href="/book">Check my date</Link>
          </Button>
          <p className="ks-cta-hint">* book at least 2 weeks ahead</p>
        </div>
      </section>
    </>
  );
}
