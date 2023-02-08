import {useRouteProgress} from '@/app/hooks/hooks';
import {GraphqlClientProvider} from '@/app/queryClient/queryClient';
import '@/app/styles/globals.css';

import type {AppProps} from 'next/app';

const App = ({Component, pageProps}: AppProps) => {
  useRouteProgress();

  return (
    <GraphqlClientProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </GraphqlClientProvider>
  );
};

export default App;
