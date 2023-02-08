import {createClient, debugExchange, fetchExchange, cacheExchange} from 'urql';

import {isServer} from '@/common/utils/utils';

import {graphqlUrl as url} from './consts';

import type {ClientOptions, Client, Exchange} from 'urql';

const urqlClient: Client | null = null;

export const createUrqlClient = (
  clientOptions?: Omit<ClientOptions, 'url'>,
) => {
  const defaultExchanges: readonly Exchange[] = [
    debugExchange,
    fetchExchange,
    cacheExchange,
  ];

  if (isServer()) {
    const client = createClient({
      ...clientOptions,
      url,
      exchanges: [...(clientOptions?.exchanges ?? []), ...defaultExchanges],
      suspense: false,
    });

    return client;
  }

  if (urqlClient) {
    return urqlClient;
  }

  const nextUrqlClient = createClient({
    ...clientOptions,
    url,
    exchanges: [...(clientOptions?.exchanges ?? []), ...defaultExchanges],
  });

  return nextUrqlClient;
};
