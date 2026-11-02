import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'paper-album-ui';
import { images } from '@/content/images';
import { site } from '@/content/site';
import { bigMountains, fireflies, ridge, VIEW_WIDTH } from '@/lib/landscape';
import '@/styles/paper-banner.css';

const big = bigMountains(600);
const layers = {
  r1: ridge(13, 420, 300, 40, 1.2),
  r2: ridge(19, 380, 250, 44, 1.7),
  hills: ridge(29, 360, 220, 46, 1.5),
  front: ridge(41, 300, 150, 40, 2.1),
  ground: ridge(53, 200, 92, 22, 3.1),
};
const flies = fireflies(16);

/** Front to back: each sheet stands up after the one before it, then the photographs float up. */
const RISE = 0.35;
const STEP = 0.32;
const ORDER = { ground: 0, deep: 1, hills: 2, r2: 3, r1: 4, far: 5 };
const PHOTOS_AT = RISE + STEP * 5 + 0.6;

const PRINTS = [
  { left: '9%', bottom: '14%', width: 'clamp(130px, 15vw, 230px)', rotate: -7, wide: false },
  { left: '31%', bottom: '17%', width: 'clamp(120px, 13vw, 200px)', rotate: 4, wide: true },
  { left: '55%', bottom: '15%', width: 'clamp(130px, 15vw, 230px)', rotate: -3, wide: false },
  { left: '77%', bottom: '18%', width: 'clamp(120px, 13vw, 200px)', rotate: 6, wide: true },
];

function Sheet({ order, height, z, children }: { order: number; height: string; z: number; children: ReactNode }) {
  return (
    <div aria-hidden="true" className="ks-banner-sheet" style={{ height, zIndex: z, animationDelay: `${RISE + order * STEP}s` }}>
      {children}
    </div>
  );
}

function Cut({ d, fill, height, shadow }: { d: string; fill: string; height: number; shadow: number }) {
  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${height}`} preserveAspectRatio="none" style={{ '--sheet-shadow': shadow } as CSSProperties}>
      <g filter="url(#ks-cut)">
        <path d={d} fill={fill} />
      </g>
    </svg>
  );
}

/** A full-screen paper landscape: flat sheets stand up one by one, front to back, and the photographs float up between them. */
export function PaperBanner() {
  return (
    <section aria-label={site.name} className="ks-banner">
      <svg aria-hidden="true" width="0" height="0" className="ks-banner-defs">
        <filter id="ks-cut">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={7} />
          <feDisplacementMap in="SourceGraphic" scale={8} />
        </filter>
      </svg>

      <div aria-hidden="true" className="ks-banner-sky">
        <div className="ks-banner-sun" />
        <svg className="ks-banner-cloud ks-banner-cloud-1" viewBox="0 0 260 90">
          <path d="M18 78 C 4 78 2 58 18 54 C 14 34 40 26 52 40 C 60 16 98 12 108 36 C 120 20 150 22 156 44 C 172 30 204 36 204 56 C 226 52 248 64 240 78 Z" />
        </svg>
        <svg className="ks-banner-cloud ks-banner-cloud-2" viewBox="0 0 200 70">
          <path d="M14 62 C 2 62 2 46 14 44 C 12 28 34 22 44 34 C 52 14 84 12 92 32 C 104 20 128 24 132 42 C 150 36 176 44 172 62 Z" />
        </svg>
      </div>

      <div aria-hidden="true" className="ks-banner-far" style={{ animationDelay: `${RISE + ORDER.far * STEP}s` }}>
        <svg viewBox={`0 0 ${VIEW_WIDTH} 600`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="ks-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in srgb, var(--border) 85%, var(--wood))" />
              <stop offset="70%" stopColor="color-mix(in srgb, var(--muted) 60%, var(--border))" />
              <stop offset="100%" stopColor="var(--background)" />
            </linearGradient>
          </defs>
          <path d={big.outline} fill="url(#ks-haze)" />
          <path d={big.snow} fill="var(--print)" opacity="0.92" />
        </svg>
      </div>

      <Sheet order={ORDER.r1} height="50%" z={2}>
        <Cut d={layers.r1} fill="color-mix(in srgb, var(--muted) 55%, var(--border))" height={420} shadow={0.14} />
      </Sheet>
      <Sheet order={ORDER.r2} height="44%" z={2}>
        <Cut d={layers.r2} fill="var(--border)" height={380} shadow={0.2} />
      </Sheet>
      <Sheet order={ORDER.hills} height="38%" z={3}>
        <Cut d={layers.hills} fill="color-mix(in srgb, var(--border) 30%, var(--wood))" height={360} shadow={0.28} />
      </Sheet>

      <div aria-hidden="true" className="ks-banner-prints">
        {PRINTS.map((print, i) => (
          <div
            key={images.banner[i].image.src}
            className="ks-banner-rise"
            data-wide={print.wide || undefined}
            data-print={i}
            style={{ left: print.left, bottom: print.bottom, width: print.width, '--tilt-from': `${print.rotate + 8}deg`, animationDelay: `${PHOTOS_AT + i * 0.16}s` } as CSSProperties}
          >
            <div className="ks-banner-bob" style={{ '--tilt': `${print.rotate}deg`, '--bob': `${3.6 + i * 0.7}s`, animationDelay: `${-i * 1.1}s` } as CSSProperties}>
              <div className="ks-banner-print">
                <Image src={images.banner[i].image.src} width={images.banner[i].image.width} height={images.banner[i].image.height} alt="" sizes="(max-width: 809px) 45vw, 230px" priority={i === 0} />
              </div>
              <span className="ks-banner-caption">{images.banner[i].caption}</span>
            </div>
          </div>
        ))}
      </div>

      <Sheet order={ORDER.deep} height="28%" z={5}>
        <Cut d={layers.front} fill="var(--primary)" height={300} shadow={0.34} />
      </Sheet>
      <Sheet order={ORDER.ground} height="15%" z={6}>
        <Cut d={layers.ground} fill="var(--primary-edge)" height={200} shadow={0.32} />
      </Sheet>

      <div aria-hidden="true" className="ks-banner-flies">
        {flies.map((fly) => (
          <span key={`${fly.x}${fly.y}`} style={{ left: fly.x, top: fly.y, '--dx': fly.dx, '--dy': fly.dy, '--drift': fly.drift, animationDelay: `${fly.delay}, ${fly.delay}` } as CSSProperties} />
        ))}
      </div>

      <div className="ks-banner-title" style={{ animationDelay: `${PHOTOS_AT + 0.4}s` }}>
        <p className="ks-banner-eyebrow">{site.eyebrow}</p>
        <div className="ks-banner-label">
          <div>
            <h1>{site.name}</h1>
          </div>
        </div>
        <p className="ks-banner-tagline">{site.tagline}</p>
        <div className="ks-banner-actions">
          <Button asChild variant="seal">
            <Link href="/book">Book a session</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/albums">See the albums</Link>
          </Button>
          <span className="ks-banner-hint">replies within 2 days</span>
        </div>
      </div>
    </section>
  );
}
