import {useMemo} from 'react';
import {Provider as UrqlProvider} from 'urql';

import {entries} from '@/common/utils/utils';

import {isSRRDataKey} from './dehydrate';
import {useHyrate} from './useHydrate';

import type {SRRData} from './dehydrate';
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
    const foundEntry = entries(pageProps).find(
      (entry): entry is readonly [symbol, SRRData] => isSRRDataKey(entry[0]),
    );

    return foundEntry?.[1];
  }, [pageProps]);
  const urqlClient = useHyrate(srrData);

  return <UrqlProvider value={urqlClient}>{children}</UrqlProvider>;
};
