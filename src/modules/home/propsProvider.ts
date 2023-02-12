import loadNamespaces from 'next-translate/loadNamespaces';

import {createUrqlClient} from '@/app/queryClient/queryClient';
import {routes} from '@/common/consts/routes';
import CHANNELS_SLUGS_QUERY from '@/common/graphql/queries/ChannelsSlugs.graphql';
import {i18nConfig} from '@root/i18n';

import type {ChannelsSlugsQuery} from '@/common/graphql/generated/graphql';
import type {InferParsedQuery} from '@/common/types/types';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export const getStaticPaths = async () => {
  const urqlClient = createUrqlClient();

  const {data: channelsSlugsQuery} = await urqlClient
    .query<ChannelsSlugsQuery>(CHANNELS_SLUGS_QUERY, {})
    .toPromise();
  const channels =
    channelsSlugsQuery?.channels?.map((channel) => channel.slug) ?? [];

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
  const {locale} = params ?? {};

  const namespaces = await loadNamespaces({
    locale: locale ?? i18nConfig.defaultLocale,
    pathname: routes.home,
  });

  return {
    props: {
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
