import {DefaultLayout} from '@/layouts/layouts';
import {i18nConfig} from '@root/i18n';

import {useRouteProgress} from './hooks/hooks';
import {typedAppWithI18n} from './i18n';
import {AppProviders} from './providers';

import type {AppProps} from 'next/app';

function AppRoot({Component, pageProps}: AppProps) {
  useRouteProgress();

  return (
    <AppProviders pageProps={pageProps}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProviders>
  );
}

export const App = typedAppWithI18n(AppRoot, i18nConfig);
