import {
  Hydrate,
  QueryClient,
  QueryClientProvider as QueryClientProviderInner,
} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import {useConst} from '~composables/state/state';

import type {ReactNode} from 'react';

type QueryClientProviderProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export function QueryClientProvider({
  children,
  pageProps,
}: QueryClientProviderProps) {
  const queryClient = useConst(() => new QueryClient());

  return (
    <QueryClientProviderInner client={queryClient}>
      <ReactQueryDevtools panelPosition='left' initialIsOpen={false} />
      <Hydrate state={pageProps['dehydratedState']}>{children}</Hydrate>
    </QueryClientProviderInner>
  );
}
