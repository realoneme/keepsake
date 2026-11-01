import { Caveat, Fraunces, Instrument_Sans } from 'next/font/google';

export const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap' });
export const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });
export const caveat = Caveat({ subsets: ['latin'], weight: ['500'], variable: '--font-caveat', display: 'swap' });
