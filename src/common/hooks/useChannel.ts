import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import CHANNELS_SLUGS_QUERY from '@/common/graphql/queries/ChannelsSlugs.graphql';
import {isObject, keyIn, isString} from '@/common/utils/utils';

import {useFetch} from './useFetch';
import {getLocale} from './useLocale';

import type {ChannelsSlugsQuery} from '@/common/graphql/generated/graphql';
import type {ParsedUrlQuery} from 'querystring';

const defaultChannelName = 'default-channel';

const getChannel = (parsedUrlQuery: ParsedUrlQuery) => {
  if (
    isObject(parsedUrlQuery) &&
    keyIn(parsedUrlQuery, 'channel') &&
    isString(parsedUrlQuery.channel)
  ) {
    return parsedUrlQuery.channel;
  }

  return defaultChannelName;
};

export const useChannel = () => {
  const router = useRouter();
  const [{data}] = useFetch<ChannelsSlugsQuery>({query: CHANNELS_SLUGS_QUERY});

  const channelsSlugs = useMemo(() => {
    return data?.channels?.map((channel) => channel.slug) ?? [];
  }, [data?.channels]);

  const setChannel = useCallback(
    (nextChannel: string) => {
      if (channelsSlugs.includes(nextChannel)) {
        void router.push({
          pathname: '/[channel]/[locale]',
          query: {
            channel: nextChannel,
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
