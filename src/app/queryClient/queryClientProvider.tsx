import {
  Hydrate,
  QueryClient,
  QueryClientProvider as QueryClientProviderInner,
} from '@tanstack/react-query';

import {useConst} from '@/common/hooks/hooks';

import type {ReactNode} from 'react';

type QueryClientProviderProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export const QueryClientProvider = ({
  children,
  pageProps,
}: QueryClientProviderProps) => {
  const queryClient = useConst(() => new QueryClient());

  return (
    <QueryClientProviderInner client={queryClient}>
      <Hydrate state={pageProps['dehydratedState']}>{children}</Hydrate>
    </QueryClientProviderInner>
  );
};
