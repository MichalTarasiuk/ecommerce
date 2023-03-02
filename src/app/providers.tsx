import {
  CartProvider,
  NetworkProvider,
  UIStateProvider,
} from './contexts/contexts';
import {QueryClientProvider} from './queryClient/queryClient';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export function AppProviders({children, pageProps}: AppProvidersProps) {
  return (
    <QueryClientProvider pageProps={pageProps}>
      <NetworkProvider>
        <CartProvider>
          <UIStateProvider>{children}</UIStateProvider>
        </CartProvider>
      </NetworkProvider>
    </QueryClientProvider>
  );
}
