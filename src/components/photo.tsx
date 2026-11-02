import NextImage from 'next/image';
import { PhotoHolder, type PhotoHolderVariant } from 'paper-album-ui';
import type { Image } from '@/content/types';

interface PrintProps {
  image: Image;
  holder?: PhotoHolderVariant | string;
  note?: string;
  tilt?: number;
  /** CSS aspect ratio the photo is cropped to. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
}

/** A photograph held on the page. Only client photographs get a holder; product shots are plain images. */
export function Print({ image, holder = 'corners', note, tilt, ratio = '4 / 5', sizes, priority }: PrintProps) {
  return (
    <PhotoHolder variant={holder as PhotoHolderVariant} note={note} rotate={tilt}>
      <NextImage className="ks-print-photo" src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} priority={priority} style={{ aspectRatio: ratio }} />
    </PhotoHolder>
  );
}
