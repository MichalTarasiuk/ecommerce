import {QueryClientProvider} from 'app/queryClient/queryClient';
import {CartStateProvider} from 'lib/cartState/cartState';
import {UIStateProvider} from 'lib/ui';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export function AppProviders({children, pageProps}: AppProvidersProps) {
  return (
    <QueryClientProvider pageProps={pageProps}>
      <CartStateProvider>
        <UIStateProvider>{children}</UIStateProvider>
      </CartStateProvider>
    </QueryClientProvider>
  );
}
