import type { Metadata } from 'next';
import { AlbumCard } from '@/components/album-card';
import { Heading } from '@/components/heading';
import { albumGroups, albums } from '@/content/albums';

export const metadata: Metadata = {
  title: 'Albums',
  description: 'A few of the families, couples and faces we have photographed lately, and the albums they became.',
};

export default function AlbumsPage() {
  return (
    <>
      <section className="ks-section ks-section-header">
        <div className="ks-content ks-albums-head">
          <Heading page label="Albums" title="Every album starts as a day." lead="A few of the families, couples and faces we have photographed lately, and the albums they became." />
          <nav aria-label="Jump to" className="ks-chips">
            {albumGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      {albumGroups.map((group, i) => (
        <section key={group.id} id={group.id} className={i === albumGroups.length - 1 ? 'ks-section ks-section-last' : 'ks-section ks-section-sub'}>
          <div className="ks-content ks-stack-head">
            <div className="ks-group-head">
              <h2 className="pa-h2">{group.title}</h2>
              <p className="ks-body ks-ground-muted">{group.blurb}</p>
            </div>
            <div className="ks-album-grid">
              {albums
                .filter((album) => album.category === group.category)
                .map((album) => (
                  <AlbumCard key={album.slug} album={album} holder={group.holder} tilt={group.tilt} detailed sizes="(max-width: 809px) 100vw, 340px" />
                ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
