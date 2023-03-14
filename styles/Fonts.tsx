import {Inconsolata} from '@next/font/google';

import type {NextFont, NextFontWithVariable} from '@next/font';

type InferFontWeighArrayt<Font> = Font extends (options: {
  readonly weight?: infer Weight extends string | readonly string[];
}) => NextFont | NextFontWithVariable
  ? Exclude<Weight, string>
  : never;

type AnyInconsolataWeight = InferFontWeighArrayt<typeof Inconsolata>;

const inconsolataWeight = [
  '400',
  '700',
] as const satisfies ArrayType.ToReadonly<AnyInconsolataWeight>;

export type InconsolataWeight = Custom.ValueOf<typeof inconsolataWeight>;

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: ['400', '700'] satisfies typeof inconsolataWeight,
  display: 'swap',
});

export function Fonts() {
  return (
    <style jsx global>{`
      html {
        font-family: ${inconsolata.style.fontFamily};
      }
    `}</style>
  );
}
