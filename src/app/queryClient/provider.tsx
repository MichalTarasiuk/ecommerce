import {useMemo} from 'react';
import {Provider as UrqlProvider} from 'urql';

import {getSrrData, hasSrrData} from './dehydrate';
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
  const srrData = useMemo(() => {
    if (hasSrrData(pageProps)) {
      return getSrrData(pageProps);
    }

    return undefined;
  }, [pageProps]);
  const urqlClient = useHyrate(srrData);

  return <UrqlProvider value={urqlClient}>{children}</UrqlProvider>;
};
