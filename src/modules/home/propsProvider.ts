import {dehydrate, QueryClient} from '@tanstack/react-query';
import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {getRegion} from '@/common/utils/utils';
import {fetchLayoutData} from '@/modules/core/utils/utils';

import type {InferParsedQuery} from '@/common/types/types';
import type {getStaticPaths} from '@/modules/core/utils/utils';
import type {GetStaticPropsContext, GetStaticPropsResult} from 'next';

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
