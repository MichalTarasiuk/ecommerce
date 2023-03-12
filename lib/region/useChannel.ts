import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {useChannelsQuery} from 'graphql/generated/graphql';
import {useCartState} from 'lib/cartState/cartState';

import {getChannel, getLocale} from './helpers';

export const useChannel = () => {
  const router = useRouter();

  const {resetCartState} = useCartState();
  const {data} = useChannelsQuery();

  const channel = useMemo(() => getChannel(router.query), [router.query]);

  const channels = useMemo(() => {
    return (
      data?.channels?.flatMap(({name, slug, isActive}) => {
        if (isActive) {
          return [
            {
              name,
              slug,
            },
          ];
        }

        return [];
      }) ?? []
    );
  }, [data?.channels]);

  const setChannel = useCallback(
    async (nextChannel: string) => {
      if (channels.some((channel) => channel.name === nextChannel)) {
        const resolvedPush = await router.push({
          pathname: router.route,
          query: {
            channel: nextChannel,
            locale: getLocale(router.query),
          },
        });

        resetCartState();

        return resolvedPush;
      }

      return false;
    },
    [channels, resetCartState, router],
  );

  return {
    channel,
    channels,
    setChannel,
  };
};
