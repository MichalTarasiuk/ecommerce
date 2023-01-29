import {useMemo} from 'react';
import {ssrExchange} from 'urql';

import {isClient} from '@/common/utils/utils';

import {createUrqlClient} from './createUrqlClient';

import type {SRRData} from './dehydrate';

export const useHyrate = (initialState: SRRData | undefined) => {
  const urqlClient = useMemo(() => {
    const ssrExchangeResult = ssrExchange({
      ...(initialState ? {initialState} : null),
      isClient: isClient(),
    });

    return createUrqlClient({
      exchanges: [ssrExchangeResult],
    });
  }, [initialState]);

  return urqlClient;
};
