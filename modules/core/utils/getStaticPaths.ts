import {QueryClient} from '@tanstack/react-query';

import {request} from 'app/queryClient/queryClient';
import {i18nConfig} from 'config/i18n';
import {channelsQuery} from 'graphql/queries/queries';

import type {GetStaticPathsResult} from 'next';
import type {ChannelsQuery} from 'types/generated/graphql';

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();

  const channelsQueryResult = await queryClient.fetchQuery<ChannelsQuery>({
    queryKey: ['channels'],
    queryFn: () => request(channelsQuery),
  });

  const channels =
    channelsQueryResult.channels?.flatMap(({isActive, slug}) => {
      if (isActive) {
        return [slug];
      }

      return [];
    }) ?? [];

  const paths = i18nConfig.locales.flatMap((locale) =>
    channels.map((channel) => ({
      params: {
        locale,
        channel,
      },
    })),
  );

  return {
    paths,
    fallback: false,
  } satisfies GetStaticPathsResult;
};
