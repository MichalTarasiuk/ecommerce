import {QueryClient} from '@tanstack/react-query';

import {request} from '@/app/queryClient/queryClient';
import {channelsQuery} from '@/common/graphql/queries/queries';
import {i18nConfig} from '@root/i18n';

import type {ChannelsQuery} from '@/common/types/generated/graphql';
import type {GetStaticPathsResult} from 'next';

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();

  const channelsQueryResult = await queryClient.fetchQuery<ChannelsQuery>({
    queryFn: () => request(channelsQuery),
  });

  const channels =
    channelsQueryResult.channels?.flatMap(({isActive, slug}) =>
      isActive ? [slug] : [],
    ) ?? [];

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
