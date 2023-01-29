import {GraphqlClientProvider} from './queryClient/provider';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export const AppProviders = ({children, pageProps}: AppProvidersProps) => {
  return (
    <GraphqlClientProvider pageProps={pageProps}>
      {children}
    </GraphqlClientProvider>
  );
};
