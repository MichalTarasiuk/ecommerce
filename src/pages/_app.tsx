import type {AppProps} from 'next/app';
import {GraphqlClientProvider} from '@/app/queryClient/graphqlClient';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <GraphqlClientProvider>
      <Component {...pageProps} />
    </GraphqlClientProvider>
  );
};

export default App;
