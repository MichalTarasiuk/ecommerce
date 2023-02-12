import dynamic from 'next/dynamic';
import {useQuery} from 'urql';

import {LanguageCodeEnum} from '@/common/graphql/generated/graphql';
import MAIN_MENU_QUERY from '@/common/graphql/queries/MainMenu.graphql';

import {Navigation, Footer} from './components/components';

import type {
  MainMenuQuery,
  MainMenuQueryVariables,
} from '@/common/graphql/generated/graphql';
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
  useQuery<MainMenuQuery, MainMenuQueryVariables>({
    query: MAIN_MENU_QUERY,
    variables: {channel: 'default-channel', locale: LanguageCodeEnum.Pl},
  });

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
