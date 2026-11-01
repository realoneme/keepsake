import { albumData } from './albums.data';
import type { Album } from './types';

export const albums: Album[] = albumData;

export const featuredAlbums = albums.filter((album) => album.featured);

export const albumGroups = [
  { id: 'weddings', title: 'Weddings', category: 'Wedding', blurb: 'The ceremony, the speeches and the dancing, in order.', holder: 'corners', tilt: -1 },
  { id: 'families', title: 'Families', category: 'Family', blurb: 'Picnics, kitchens and gardens; whoever is in the family that year.', holder: 'tape', tilt: 1.5 },
  { id: 'portraits', title: 'Portraits', category: 'Portrait', blurb: 'One person, one place, good light.', holder: 'polaroid', tilt: -2 },
] as const;

export function albumBySlug(slug: string) {
  return albums.find((album) => album.slug === slug);
}

/** The album after this one, looping back to the first. */
export function nextAlbum(slug: string) {
  const index = albums.findIndex((album) => album.slug === slug);
  return albums[(index + 1) % albums.length];
}
