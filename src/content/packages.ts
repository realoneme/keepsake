import type { Package } from './types';

export const packages: Package[] = [
  {
    "name": "Portrait",
    "price": 450,
    "priceNote": "per session",
    "summary": "One hour, one place, for you or for two.",
    "includes": [
      "1 hour, 1 location",
      "30 edited photographs",
      "Private online gallery",
      "20 × 25 cm mini album"
    ],
    "mostBooked": false
  },
  {
    "name": "Family",
    "price": 750,
    "priceNote": "per session",
    "summary": "Two hours at home or somewhere you love.",
    "includes": [
      "2 hours, up to 8 people",
      "60 edited photographs",
      "Private online gallery",
      "24 × 30 cm linen album, 30 pages"
    ],
    "mostBooked": true
  },
  {
    "name": "Wedding",
    "price": 3800,
    "priceNote": "from",
    "summary": "The whole day, from getting ready to the last dance.",
    "includes": [
      "8 hours, 2 photographers",
      "500+ edited photographs",
      "Engagement session",
      "30 × 30 cm heirloom album, 80 pages"
    ],
    "mostBooked": false
  }
];
