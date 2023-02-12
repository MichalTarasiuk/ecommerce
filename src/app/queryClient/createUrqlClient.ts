import {createClient, fetchExchange, cacheExchange} from 'urql';

import {isServer} from '@/common/utils/utils';

import type {ClientOptions, Client, Exchange} from 'urql';

const urqlClient: Client | null = null;
const url = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

if (!url) {
  throw Error(`process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);
}

export const createUrqlClient = (
  clientOptions?: Omit<ClientOptions, 'url'>,
) => {
  const defaultExchanges: readonly Exchange[] = [fetchExchange, cacheExchange];

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
