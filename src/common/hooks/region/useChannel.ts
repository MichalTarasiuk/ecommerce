import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import CHANNELS_QUERY from '@/common/graphql/queries/Channels.graphql';

import {useFetch} from '../useFetch';

import {getChannel, getLocale} from './helpers';

import type {ChannelsQuery} from '@/common/graphql/generated/graphql';

export const useChannel = () => {
  const router = useRouter();
  const [{data}] = useFetch<ChannelsQuery>({query: CHANNELS_QUERY});

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

  const channel = useMemo(() => getChannel(router.query), [router.query]);

  const setChannel = useCallback(
    async (nextChannel: string) => {
      if (channels.some((channel) => channel.name === nextChannel)) {
        await router.push({
          pathname: '/[channel]/[locale]',
          query: {
            channel: nextChannel,
            locale: getLocale(router.query),
          },
        });
      }
    },
    [channels, router],
  );

  return {
    channel,
    channels,
    setChannel,
  };
};
