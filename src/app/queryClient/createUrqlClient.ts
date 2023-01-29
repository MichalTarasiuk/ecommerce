import {createClient} from 'urql';

import {isServer} from '@/common/utils/utils';

import {graphqlUrl as url} from './consts';

import type {ClientOptions, Client} from 'urql';

const urqlClient: Client | null = null;

export const createUrqlClient = (
  clientOptions?: Omit<ClientOptions, 'url'>,
) => {
  if (isServer()) {
    const client = createClient({
      ...clientOptions,
      url,
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
  });

  return nextUrqlClient;
};
