import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Print } from '@/components/photo';
import { Button } from 'paper-album-ui';
import { albumBySlug, albums, nextAlbum } from '@/content/albums';

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const album = albumBySlug((await params).slug);
  if (!album) return {};
  return { title: album.title, description: album.excerpt, openGraph: { images: [{ url: album.cover.src }] } };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const album = albumBySlug((await params).slug);
  if (!album) notFound();
  const next = nextAlbum(album.slug);

  return (
    <>
      <section className="ks-section ks-section-header">
        <div className="ks-content ks-album-head">
          <Link href="/albums" className="ks-small ks-ground-muted ks-back">
            ← All albums
          </Link>
          <div className="ks-album-title">
            <div className="ks-heading">
              <p className="pa-label-caps ks-wood">
                {album.category} · {album.place}
              </p>
              <h1 className="ks-display-xl">{album.title}</h1>
              <p className="pa-lead">{album.excerpt}</p>
            </div>
            <p className="pa-note ks-seal ks-tilt">{album.note}</p>
          </div>
        </div>
      </section>

      <section className="ks-section ks-section-sub">
        <div className="ks-content">
          <Print image={album.cover} holder="corners" ratio="3 / 2" sizes="(max-width: 1199px) 100vw, 1136px" priority />
        </div>
      </section>

      <section className="ks-section ks-section-sub">
        <div className="ks-content ks-stack-head">
          <p className="pa-label-caps ks-wood">From the album</p>
          <div className="ks-gallery">
            {album.photos.map((photo) => (
              <Print key={photo.image.src} image={photo.image} holder="polaroid" note={photo.caption} sizes="(max-width: 809px) 100vw, (max-width: 1199px) 33vw, 550px" />
            ))}
          </div>
        </div>
      </section>

      <section className="ks-section">
        <div className="ks-content">
          <div className="ks-story">
            <p className="pa-label-caps ks-wood">The story</p>
            {album.story.map((block) =>
              block.type === 'heading' ? (
                <h2 key={block.text} className="pa-h3">
                  {block.text}
                </h2>
              ) : (
                <p key={block.text} className="ks-body">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="ks-section ks-section-last">
        <div className="ks-content ks-album-next">
          <div className="ks-band ks-band-raised">
            <div className="ks-band-text">
              <h2 className="pa-h3">Want an album like this one?</h2>
              <p className="ks-body ks-muted">Every session can end in a linen album. Design yours with us, or book the session first.</p>
            </div>
            <div className="ks-actions">
              <Button asChild variant="secondary">
                <Link href="/printed-albums">Design an album</Link>
              </Button>
              <Button asChild variant="seal">
                <Link href="/book">Book a session</Link>
              </Button>
            </div>
          </div>
          <Link href={`/albums/${next.slug}`} className="ks-next">
            <span className="pa-label-caps ks-ground-muted">Next album</span>
            <span className="pa-h3">{next.title}</span>
            <span className="pa-h3 ks-seal" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
