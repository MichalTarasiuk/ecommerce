import {Inconsolata} from '@next/font/google';
import classNames from 'classnames';

import {Menu, Navigation} from './components/components';

import type {ReactNode} from 'react';

type DefaultLayoutProps = {
  readonly children: ReactNode;
};

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['700'],
});

export const DefaultLayout = ({children}: DefaultLayoutProps) => {
  return (
    <div className={classNames('container m-auto', inconsolata.className)}>
      <header>
        <Navigation />
      </header>
      <Menu />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};
