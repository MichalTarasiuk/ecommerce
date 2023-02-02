import {Inconsolata} from '@next/font/google';

import type {ReactNode} from 'react';

type MainProps = {
  readonly children: ReactNode;
};

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const Main = ({children}: MainProps) => (
  <main className={inconsolata.className}>{children}</main>
);
