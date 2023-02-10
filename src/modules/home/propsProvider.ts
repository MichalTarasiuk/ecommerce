import loadNamespaces from 'next-translate/loadNamespaces';
import {ssrExchange} from 'urql';

import {createUrqlClient, dehydrate} from '@/app/queryClient/queryClient';
import {routes} from '@/common/consts/routes';
import FETCH_PRODUCTS_LIST from '@/common/graphql/queries/fetchProductsList.graphql';
import {i18nConfig} from '@root/i18n';

import type {FetchProductsListQueryVariables} from '@/common/graphql/generated/graphql';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export const getStaticPaths = () => {
  const paths = i18nConfig.locales.map((locale) => ({
    params: {
      locale,
      channel: 'default-chanel',
    },
  }));

  return {
    paths,
    fallback: false,
  } satisfies GetStaticPathsResult;
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<
  ReturnType<typeof getStaticPaths>['paths'][number]['params']
>) => {
  const {locale} = params ?? {};

  const ssrCache = ssrExchange({isClient: false});
  const urqlClient = createUrqlClient({
    exchanges: [ssrCache],
  });

  const productListPromise = urqlClient
    .query<unknown, FetchProductsListQueryVariables>(FETCH_PRODUCTS_LIST, {})
    .toPromise();

  const namespacesPromise = loadNamespaces({
    locale: locale ?? i18nConfig.defaultLocale,
    pathname: routes.home,
  });

  await productListPromise;
  const namespaces = await namespacesPromise;

  return {
    props: {
      ...dehydrate(ssrCache),
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
