import Inspect from 'inspx';
import appWithI18n from 'next-translate/appWithI18n';
import {Toaster} from 'sonner';

import {i18nConfig} from 'config/i18n';
import {useRouteProgress} from 'lib/nextRouter';
import {useSession} from 'lib/session';
import {Fonts} from 'styles/Fonts';

import {AppProviders} from './Providers';

import type {AppProps} from 'next/app';
import type {NextPageWithLayout} from 'types/next';

type AppPropsWithLayout = Partial<
  AppProps & {
    readonly Component: Partial<NextPageWithLayout>;
  }
>;

function AppRoot({Component, pageProps}: AppPropsWithLayout) {
  useSession();
  useRouteProgress();

  if (!Component) {
    return null;
  }

  const getLayout: NextPageWithLayout['getLayout'] =
    Component?.getLayout ?? ((page) => page);

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

export const App = appWithI18n(AppRoot, i18nConfig);
