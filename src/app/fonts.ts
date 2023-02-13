import {Inconsolata} from '@next/font/google';

type InconsolataWeight = Exclude<
  Required<Parameters<typeof Inconsolata>[0]>,
  undefined
>['weight'];

export const inconsolataWeight = ['400', '700'] satisfies InconsolataWeight;

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  weight: inconsolataWeight,
  display: 'swap',
});
