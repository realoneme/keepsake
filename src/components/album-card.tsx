import Link from 'next/link';
import { Print } from '@/components/photo';
import type { Album } from '@/content/types';

interface AlbumCardProps {
  album: Album;
  holder: string;
  tilt?: number;
  /** Show the excerpt under the title (the album index); the carousel shows the note above it. */
  detailed?: boolean;
  sizes: string;
}

export function AlbumCard({ album, holder, tilt, detailed, sizes }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.slug}`} className="ks-album">
      <Print image={album.cover} holder={holder} tilt={tilt} note={detailed ? album.note : undefined} sizes={sizes} />
      <div className="ks-album-text">
        {detailed ? null : <p className="ks-note-sm ks-wood">{album.note}</p>}
        <h3 className="pa-h3">{album.title}</h3>
        <p className="ks-small ks-ground-muted">{album.place}</p>
        {detailed ? <p className="ks-body ks-ground-muted">{album.excerpt}</p> : null}
      </div>
    </Link>
  );
}
