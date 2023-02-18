import {UIStateProvider} from './contexts';
import {QueryClientProvider} from './queryClient/queryClientProvider';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export const AppProviders = ({children, pageProps}: AppProvidersProps) => {
  return (
    <QueryClientProvider pageProps={pageProps}>
      <UIStateProvider>{children}</UIStateProvider>
    </QueryClientProvider>
  );
};
