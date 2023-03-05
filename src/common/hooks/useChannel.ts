import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {useCartState} from '@/app/contexts/contexts';
import {request} from '@/app/queryClient/request/request';
import {channelsQuery} from '@/common/graphql/queries/queries';
import {getChannel, getLocale} from '@/common/utils/utils';

import type {ChannelsQuery} from '@/common/types/generated/graphql';

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
