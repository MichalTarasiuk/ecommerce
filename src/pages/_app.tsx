import {GraphqlClientProvider} from '@/app/queryClient/graphqlClient';
import '@/app/styles/globals.css';

import type {AppProps} from 'next/app';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <GraphqlClientProvider>
      <Component {...pageProps} />
    </GraphqlClientProvider>
  );
};

export default App;
