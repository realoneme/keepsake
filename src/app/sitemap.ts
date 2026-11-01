import type { MetadataRoute } from 'next';
import { albums } from '@/content/albums';
import { siteUrl } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/albums', '/services', '/printed-albums', '/book', '/about'];
  return [...pages, ...albums.map((album) => `/albums/${album.slug}`)].map((path) => ({ url: `${siteUrl()}${path}` }));
}
