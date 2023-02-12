import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import CHANNELS_SLUGS_QUERY from '@/common/graphql/queries/ChannelsSlugs.graphql';

import {useFetch} from '../useFetch';

import {getChannel, getLocale} from './helpers';

import type {ChannelsSlugsQuery} from '@/common/graphql/generated/graphql';

export const useChannel = () => {
  const router = useRouter();
  const [{data}] = useFetch<ChannelsSlugsQuery>({query: CHANNELS_SLUGS_QUERY});

  const channelsSlugs = useMemo(() => {
    return data?.channels?.map((channel) => channel.slug) ?? [];
  }, [data?.channels]);

  const setChannel = useCallback(
    async (nextChannel: string) => {
      if (channelsSlugs.includes(nextChannel)) {
        await router.push({
          pathname: '/[channel]/[locale]',
          query: {
            locale: getLocale(router.query),
          },
        });
      }
    },
    [channelsSlugs, router],
  );

  const channel = useMemo(() => getChannel(router.query), [router.query]);

  return {
    channel,
    setChannel,
  };
};
