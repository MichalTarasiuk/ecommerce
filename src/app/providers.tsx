import {CartProvider, UIStateProvider} from './contexts/contexts';
import {QueryClientProvider} from './queryClient/queryClient';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export function AppProviders({children, pageProps}: AppProvidersProps) {
  return (
    <QueryClientProvider pageProps={pageProps}>
      <CartProvider>
        <UIStateProvider>{children}</UIStateProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
