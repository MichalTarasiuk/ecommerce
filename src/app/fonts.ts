// Font loader values must be explicitly written literals.
import {Inconsolata} from '@next/font/google';

import type {ArrayType} from '@/common/types/types';
import type {NextFont, NextFontWithVariable} from '@next/font';

type InferFontWeighArrayt<Font> = Font extends (options: {
  readonly weight?: infer Weight extends string | readonly string[];
}) => NextFont | NextFontWithVariable
  ? Exclude<Weight, string>
  : never;

type InconsolataWeight = InferFontWeighArrayt<typeof Inconsolata>;

export const inconsolataWeight = [
  '400',
  '700',
] as const satisfies ArrayType.ToReadonly<InconsolataWeight>;

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: ['400', '700'] satisfies typeof inconsolataWeight,
  display: 'swap',
});
