import {Inconsolata} from '@next/font/google';
import classNames from 'classnames';

import type {HTMLAttributes, ReactNode} from 'react';

type MainProps = {
  readonly children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const Main = ({children, ...props}: MainProps) => (
  <main
    {...props}
    className={classNames(inconsolata.className, props.className)}
  >
    {children}
  </main>
);
