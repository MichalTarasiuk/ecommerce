import Inspect from 'inspx';
import appWithI18n from 'next-translate/appWithI18n';
import {Toaster} from 'sonner';

import {useRouteProgress} from '~composables/router';
import {useSession} from '~composables/session';
import {i18nConfig} from '~config/i18n';
import {Fonts} from '~styles/Fonts';

import {AppProviders} from './Providers';

import type {NextPage, NextComponentType, NextPageContext} from 'next';
import type {AppProps} from 'next/app';
import type {ReactElement, ReactNode} from 'react';
import type {ExtendedI18nConfig} from '~config/i18n';

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
      <Fonts />
      <Toaster position='top-right' />
      {getLayout(
        <Inspect>
          <Component {...pageProps} />
        </Inspect>,
      )}
    </AppProviders>
  );
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- extend config type (readonly)
const typedAppWithI18n = appWithI18n as unknown as (
  nextComponent: NextComponentType<NextPageContext, unknown, AppProps>,
  config?: ExtendedI18nConfig,
) => ReturnType<typeof appWithI18n>;

export const App = typedAppWithI18n(AppRoot, i18nConfig);
