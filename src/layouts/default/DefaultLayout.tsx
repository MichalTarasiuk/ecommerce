import dynamic from 'next/dynamic';

import {Navigation, Footer} from './components/components';

import type {InferProps} from '@/common/types/types';
import type {ReactNode} from 'react';

type DefaultLayoutProps = {
  readonly children: ReactNode;
};

type MenuProps = InferProps<typeof import('./components/components')['Menu']>;

const Menu = dynamic<MenuProps>(
  () => import('./components/components').then((module) => module.Menu),
  {
    ssr: false,
  },
);

export function DefaultLayout({children}: DefaultLayoutProps) {
  return (
    <div className='container m-auto'>
      <header>
        <Navigation />
      </header>
      <Menu />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
