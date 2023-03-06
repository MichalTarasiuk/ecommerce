import loadNamespaces from 'next-translate/loadNamespaces';

import {getRegion, hasOwn} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {getStaticPaths} from './getStaticPaths';
import type {routes} from '@/common/consts/consts';
import type {InferParsedQuery} from '@/common/types/types';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from 'next';
import type {ParsedUrlQuery as AnyParsedUrlQuery} from 'querystring';

type PropsProviderContext<ParsedUrlQuery extends AnyParsedUrlQuery> =
  | GetServerSidePropsContext<ParsedUrlQuery>
  | GetStaticPropsContext<ParsedUrlQuery>;

type PropsProviderResult =
  | GetServerSidePropsResult<Record<PropertyKey, unknown>>
  | GetStaticPathsResult;

export const createNamespacesProvider = (
  pathname: ObjectType.DeepValueOf<typeof routes>,
) => {
  if (!hasOwn(i18nConfig.pages, pathname)) {
    throw Error(`${pathname} is not supported by next translate`);
  }

  const namespacesPropsProvider = async ({
    params,
  }: PropsProviderContext<InferParsedQuery<typeof getStaticPaths>>) => {
    const {locale} = getRegion(params);

    const namespaces = await loadNamespaces({
      locale,
      pathname,
    });

    return {
      props: {
        ...namespaces,
      },
    } satisfies PropsProviderResult;
  };

  return namespacesPropsProvider;
};
