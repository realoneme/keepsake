import type { Metadata } from 'next';
import Link from 'next/link';
import { Heading } from '@/components/heading';
import { Print } from '@/components/photo';
import { Button } from 'paper-album-ui';
import { images } from '@/content/images';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'A photographer who thinks a photograph is finished only when it is printed.',
};

const principles = [
  { mark: 'i.', title: 'Slow sessions', body: 'Two hours for a family, a whole day for a wedding. Nobody relaxes in twenty minutes.' },
  { mark: 'ii.', title: 'Very few poses', body: 'I give you somewhere to stand and something to do, then I wait. The waiting is the job.' },
  { mark: 'iii.', title: 'Albums, not folders', body: 'A gallery link gets lost in an inbox. An album stays on the shelf and gets taken down at Christmas.' },
];

export default function AboutPage() {
  const { portrait, favourites } = images;
  return (
    <>
      <section className="ks-section ks-section-first">
        <div className="ks-content ks-split ks-split-about">
          <Print image={portrait.image} holder={portrait.holder} note={portrait.note} tilt={portrait.tilt} sizes="(max-width: 809px) 80vw, 420px" priority />
          <div className="ks-heading">
            <Heading
              page
              label="About"
              title={`Hello, I’m ${site.photographer}.`}
              lead={`I have photographed [140] weddings and more families than I can count, mostly in and around ${site.city}. I came to photography through my grandmother’s albums, the kind with corners and tissue between the pages.`}
            />
            <p className="ks-body ks-ground-muted">I still think a photograph is finished only when it is printed. So every session I shoot ends the same way: in an album you can hold, pass around and spill coffee on.</p>
            <p className="pa-note ks-seal ks-tilt">{site.photographer}</p>
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content ks-stack-head">
          <Heading label="How I work" title="Three things I won’t change" />
          <div className="ks-cards ks-cards-3">
            {principles.map((item) => (
              <article key={item.title} className="ks-principle">
                <p className="pa-note ks-seal">{item.mark}</p>
                <h3 className="pa-h3">{item.title}</h3>
                <p className="ks-body ks-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section ks-section-last">
        <div className="ks-content ks-stack-head">
          <Heading label="Lately" title="Some favourites from this year" />
          <div className="ks-favourites">
            {favourites.map((item) => (
              <Print key={item.image.src} image={item.image} holder={item.holder} note={item.note} tilt={item.tilt} sizes="(max-width: 809px) 45vw, 260px" />
            ))}
          </div>
          <Button asChild variant="seal" className="ks-self-start">
            <Link href="/book">Book a session</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
