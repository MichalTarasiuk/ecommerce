import {Inconsolata} from '@next/font/google';

import type {NextFont, NextFontWithVariable} from '@next/font';

type InferFontWeight<Font> = Font extends (options: {
  readonly weight?: infer Weight extends string | readonly string[];
}) => NextFont | NextFontWithVariable
  ? Weight
  : never;

type InconsolataWeight = InferFontWeight<typeof Inconsolata>;

export const inconsolataWeight = ['400', '700'] satisfies InconsolataWeight;

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: inconsolataWeight,
  display: 'swap',
});
