import {Toaster} from 'sonner';

import {i18nConfig} from '@root/i18n';

import {inconsolata} from './fonts';
import {useSession, useRouteProgress} from './hooks/hooks';
import {typedAppWithI18n} from './i18n';
import {AppProviders} from './providers';

import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import type {ReactElement, ReactNode} from 'react';

export type NextPageWithLayout<Props = {}> = NextPage<Props> & {
  readonly getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  readonly Component: NextPageWithLayout;
};

function AppRoot({Component, pageProps}: AppPropsWithLayout) {
  useSession();
  useRouteProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProviders pageProps={pageProps}>
      <style jsx global>{`
        html {
          font-family: ${inconsolata.style.fontFamily};
        }
      `}</style>
      <Toaster position='top-right' />
      {getLayout(<Component {...pageProps} />)}
    </AppProviders>
  );
}

export const App = typedAppWithI18n(AppRoot, i18nConfig);
