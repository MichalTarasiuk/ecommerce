import type {AppProps} from 'next/app';
import {GraphqlClientProvider} from '@/app/queryClient/graphqlClient';
import '@/app/styles/globals.css';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <GraphqlClientProvider>
      <Component {...pageProps} />
    </GraphqlClientProvider>
  );
};

export default App;
