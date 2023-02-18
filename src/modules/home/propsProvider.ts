import {dehydrate, QueryClient} from '@tanstack/react-query';
import loadNamespaces from 'next-translate/loadNamespaces';

import {request} from '@/app/queryClient/request/request';
import {routes} from '@/common/consts/routes';
import {channelsQuery} from '@/common/graphql/queries/queries';
import {getRegion} from '@/common/utils/utils';
import {fetchLayoutData} from '@/modules/core/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {ChannelsQuery} from '@/common/graphql/generated/graphql';
import type {InferParsedQuery} from '@/common/types/types';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();

  const channelsQueryResult = await queryClient.fetchQuery<ChannelsQuery>({
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

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<InferParsedQuery<typeof getStaticPaths>>) => {
  const queryClient = new QueryClient();
  const region = getRegion(params);

  const [namespaces] = await Promise.all([
    loadNamespaces({
      locale: region.locale,
      pathname: routes.home,
    }),
    fetchLayoutData(queryClient, {
      region: region.variables,
      isNextLinkRequest: false,
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
