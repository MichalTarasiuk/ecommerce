import {useRouteProgress} from '@/app/hooks/hooks';
import {AppProviders} from '@/app/providers';
import '@/app/styles/globals.css';
import {DefaultLayout} from '@/layouts/layouts';

import type {AppProps} from 'next/app';

const App = ({Component, pageProps}: AppProps) => {
  useRouteProgress();

  return (
    <AppProviders pageProps={pageProps}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProviders>
  );
};

export default App;
