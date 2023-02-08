import {useMemo} from 'react';
import {ssrExchange} from 'urql';

import {isClient} from '@/common/utils/utils';

import {createUrqlClient} from './createUrqlClient';
import {getSrrData, hasSrrData} from './dehydrate';

export const useHyrate = (pageProps: Record<PropertyKey, unknown>) => {
  const urqlClient = useMemo(() => {
    const initialState = hasSrrData(pageProps) ? getSrrData(pageProps) : null;
    const ssrExchangeResult = ssrExchange({
      ...(initialState ? {initialState} : null),
      isClient: isClient(),
    });

    return createUrqlClient({
      exchanges: [ssrExchangeResult],
    });
  }, [pageProps]);

  return urqlClient;
};
