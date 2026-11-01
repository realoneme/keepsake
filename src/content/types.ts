export interface Image {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export type Category = 'Wedding' | 'Family' | 'Portrait';

export interface AlbumPhoto {
  image: Image;
  caption: string;
}

export interface StoryBlock {
  type: 'heading' | 'paragraph';
  text: string;
}

export interface Album {
  slug: string;
  title: string;
  category: string;
  cover: Image;
  place: string;
  /** ISO date of the session. */
  date: string;
  excerpt: string;
  /** Handwritten note shown on the album's print. */
  note: string;
  /** Shown in the carousel on the home page. */
  featured: boolean;
  photos: AlbumPhoto[];
  story: StoryBlock[];
}

export interface Testimonial {
  quote: string;
  name: string;
  session: string;
  photo: Image;
}

export interface Package {
  name: string;
  price: number;
  priceNote: string;
  summary: string;
  includes: string[];
  mostBooked: boolean;
}

export interface Holder {
  image: Image;
  holder: string;
  note: string;
  tilt: number;
}
