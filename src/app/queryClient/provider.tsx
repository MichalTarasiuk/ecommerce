import {Provider as UrqlProvider} from 'urql';

import {useHyrate} from './useHydrate';

import type {ReactNode} from 'react';

type GraphqlClientProviderProps = {
  readonly children: ReactNode;
  readonly pageProps: Record<PropertyKey, unknown>;
};

export const GraphqlClientProvider = ({
  children,
  pageProps,
}: GraphqlClientProviderProps) => {
  const urqlClient = useHyrate(pageProps);

  return <UrqlProvider value={urqlClient}>{children}</UrqlProvider>;
};
