/** Everything a photographer changes first. Bracketed values are placeholders. */
export const site = {
  name: '[Studio Name]',
  photographer: '[Your Name]',
  city: '[City]',
  email: 'hello@studio.com',
  emailLabel: '[hello@studio.com]',
  phone: '+15550100',
  phoneLabel: '[+1 555 0100]',
  instagram: 'https://instagram.com/',
  pinterest: 'https://pinterest.com/',
  tagline: 'Photographs, tucked in by hand.',
  eyebrow: 'Photography & printed albums',
  description: 'Weddings, families, portraits and any moment you want to keep. Every session ends in an album you can hold.',
};

export const nav = [
  { label: 'Albums', href: '/albums' },
  { label: 'Services', href: '/services' },
  { label: 'Printed albums', href: '/printed-albums' },
  { label: 'About', href: '/about' },
];

/** The public origin: an explicit setting, then Vercel's production domain, then the dev server. */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'http://localhost:3000';
}
