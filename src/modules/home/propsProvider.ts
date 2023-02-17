import loadNamespaces from 'next-translate/loadNamespaces';
import {ssrExchange as createSrrExcahnge} from 'urql';

import {createUrqlClient, dehydrate} from '@/app/queryClient/queryClient';
import {routes} from '@/common/consts/routes';
import CHANNELS_QUERY from '@/common/graphql/queries/Channels.graphql';
import {getRegion, isClient} from '@/common/utils/utils';
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
  const urqlClient = createUrqlClient();

  const {data: channelsSlugsQuery} = await urqlClient
    .query<ChannelsQuery>(CHANNELS_QUERY, {})
    .toPromise();
  const channels =
    channelsSlugsQuery?.channels?.flatMap(({isActive, slug}) => {
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
  const region = getRegion(params);

  const srrExchange = createSrrExcahnge({
    isClient: isClient(),
  });
  const urqlClient = createUrqlClient({
    exchanges: [srrExchange],
  });

  const [namespaces] = await Promise.all([
    loadNamespaces({
      locale: region.locale,
      pathname: routes.home,
    }),
    fetchLayoutData(urqlClient, {
      region: region.variables,
      isNextLinkRequest: false,
    }),
  ]);

  return {
    props: {
      ...dehydrate(srrExchange),
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
