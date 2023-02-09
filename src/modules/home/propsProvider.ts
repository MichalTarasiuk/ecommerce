import {ssrExchange} from 'urql';

import {createUrqlClient, dehydrate} from '@/app/queryClient/queryClient';
import FETCH_PRODUCTS_LIST from '@/common/graphql/queries/fetchProductsList.graphql';

import type {FetchProductsListQueryVariables} from '@/common/graphql/generated/graphql';
import type {GetStaticPropsContext, GetStaticPropsResult} from 'next';

export const getStaticProps = async (_context: GetStaticPropsContext) => {
  const ssrCache = ssrExchange({isClient: false});
  const urqlClient = createUrqlClient({
    exchanges: [ssrCache],
  });

  await urqlClient
    .query<unknown, FetchProductsListQueryVariables>(FETCH_PRODUCTS_LIST, {})
    .toPromise();

  return {
    props: dehydrate(ssrCache),
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
