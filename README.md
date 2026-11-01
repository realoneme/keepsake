# Keepsake

A paper-cut portfolio and printed-album site for wedding, family and portrait photographers, built with Next.js.

Flat sheets of paper stand up into a landscape, photographs float up between the hills, and every session ends in an album you can hold.

## Getting started

```bash
npm ci
npm run dev
```

The site runs at http://localhost:3000.

## Make it yours

| Change | Where |
|---|---|
| Studio name, city, contact details | `src/content/site.ts` |
| Albums, photographs and stories | `src/content/albums.data.ts`, photographs in `public/images/albums` |
| Which albums appear on the home page | set `featured` on an album |
| Prices and packages | `src/content/packages.ts` |
| Testimonials and questions | `src/content/testimonials.ts`, `src/content/faq.ts` |
| Colours | `src/styles/tokens.css`, with Keepsake's own paper colours at the top of `src/styles/site.css` |
| Spacing | the scale at the top of `src/styles/site.css` |

Values in square brackets, such as `[Studio Name]`, are placeholders.

## Enquiry forms

The booking and album forms post to `/api/inquiry`, which emails the enquiry through [Resend](https://resend.com). Set these in `.env.local` and in your Vercel project (see `.env.example`):

```
RESEND_API_KEY=
INQUIRY_TO=
INQUIRY_FROM=
```

Until they are set, the endpoint answers 503 and the forms ask visitors to write by email.

## Pages

`/`, `/albums`, `/albums/[slug]`, `/services`, `/printed-albums`, `/book`, `/about`, a 404 page and `/away`, a closed-for-now page to redirect to while the studio is away. `/away` is kept out of search engines.

## Quality checks

```bash
npm test
```

Runs the type checker, ESLint, the unit tests, a production build and the Playwright suite. The browser tests cover desktop, tablet and phone, including axe accessibility checks on every page. Run `npx playwright install chromium` once first.

## Stack

Next.js 16 (App Router), React 19 and TypeScript. The components in `src/components/ui` and the styles in `src/styles` come from [Paper Album UI](https://github.com/realoneme/paper-album-ui). Fonts are Fraunces, Instrument Sans and Caveat, served by `next/font`.

The photographs and the people in them are AI-generated placeholders; replace them with your own.
