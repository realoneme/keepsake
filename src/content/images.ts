import type { Holder, Image } from './types';

export const images: {
  banner: { image: Image; caption: string }[];
  sessions: Record<'Weddings' | 'Families' | 'Portraits', Image>;
  product: Record<'open' | 'spine' | 'box', Image>;
  portrait: Holder;
  favourites: Holder[];
  notFound: Holder[];
  away: Holder;
} = {
  "banner": [
    {
      "image": {
        "src": "/images/banner/1.jpg",
        "width": 1122,
        "height": 1402,
        "alt": ""
      },
      "caption": "her mother, first"
    },
    {
      "image": {
        "src": "/images/banner/2.jpg",
        "width": 1536,
        "height": 1024,
        "alt": ""
      },
      "caption": "Sunday picnic"
    },
    {
      "image": {
        "src": "/images/banner/3.jpg",
        "width": 1536,
        "height": 1024,
        "alt": ""
      },
      "caption": "barefoot by eight"
    },
    {
      "image": {
        "src": "/images/banner/4.jpg",
        "width": 1122,
        "height": 1402,
        "alt": ""
      },
      "caption": "window light"
    }
  ],
  "sessions": {
    "Weddings": {
      "src": "/images/sessions/weddings.jpg",
      "width": 1536,
      "height": 1024,
      "alt": ""
    },
    "Families": {
      "src": "/images/sessions/families.jpg",
      "width": 1536,
      "height": 1024,
      "alt": ""
    },
    "Portraits": {
      "src": "/images/sessions/portraits.jpg",
      "width": 1122,
      "height": 1402,
      "alt": ""
    }
  },
  "product": {
    "open": {
      "src": "/images/product/open-album.jpg",
      "width": 1254,
      "height": 1254,
      "alt": "An open linen album on a wooden table"
    },
    "spine": {
      "src": "/images/product/linen-spine.jpg",
      "width": 1254,
      "height": 1254,
      "alt": "The stitched spine of a linen album"
    },
    "box": {
      "src": "/images/product/heirloom-box.jpg",
      "width": 1254,
      "height": 1254,
      "alt": "A linen album in its box, wrapped in ribbon"
    }
  },
  "portrait": {
    "image": {
      "src": "/images/about/portrait.jpg",
      "width": 1122,
      "height": 1402,
      "alt": "[Your Name], holding a camera"
    },
    "holder": "polaroid",
    "note": "me, on a good day",
    "tilt": -2.0
  },
  "favourites": [
    {
      "image": {
        "src": "/images/about/favourite-1.jpg",
        "width": 1122,
        "height": 1402,
        "alt": "her mother, first"
      },
      "holder": "tape",
      "note": "her mother, first",
      "tilt": 1.0
    },
    {
      "image": {
        "src": "/images/about/favourite-2.jpg",
        "width": 1122,
        "height": 1402,
        "alt": "little steps"
      },
      "holder": "polaroid",
      "note": "little steps",
      "tilt": -2.0
    },
    {
      "image": {
        "src": "/images/about/favourite-3.jpg",
        "width": 1122,
        "height": 1402,
        "alt": "caps off"
      },
      "holder": "corners",
      "note": "caps off",
      "tilt": 0.0
    },
    {
      "image": {
        "src": "/images/about/favourite-4.jpg",
        "width": 1122,
        "height": 1402,
        "alt": "the bouquet"
      },
      "holder": "polaroid",
      "note": "the bouquet",
      "tilt": 2.0
    }
  ],
  "notFound": [
    {
      "image": {
        "src": "/images/about/not-found-1.jpg",
        "width": 1536,
        "height": 1024,
        "alt": "page 404"
      },
      "holder": "pocket",
      "note": "page 404",
      "tilt": 0.0
    },
    {
      "image": {
        "src": "/images/about/not-found-2.jpg",
        "width": 1122,
        "height": 1402,
        "alt": "where did it go?"
      },
      "holder": "polaroid",
      "note": "where did it go?",
      "tilt": 6.0
    }
  ],
  "away": {
    "image": {
      "src": "/images/about/away.jpg",
      "width": 1122,
      "height": 1402,
      "alt": "out on a shoot"
    },
    "holder": "tape",
    "note": "out on a shoot",
    "tilt": -1.0
  }
};
