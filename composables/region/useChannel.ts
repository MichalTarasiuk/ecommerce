import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {request} from '~app/queryClient/request/request';
import {useCartState} from '~composables/cartState/cartContext';
import {channelsQuery} from '~graphql/queries/queries';

import {getChannel, getLocale} from './helpers';

import type {ChannelsQuery} from '~types/generated/graphql';

export const useChannel = () => {
  const router = useRouter();

  const {resetCartState} = useCartState();
  const {data} = useQuery<ChannelsQuery>({
    queryFn: () => request(channelsQuery),
  });

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
