import loadNamespaces from 'next-translate/loadNamespaces';

import {i18nConfig} from 'config/i18n';
import {getRegion} from 'lib/region/region';
import {hasOwn} from 'utils/utils';

import type {getStaticPaths} from './getStaticPaths';
import type {routes} from 'constants/constants';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from 'next';
import type {ParsedUrlQuery as AnyParsedUrlQuery} from 'querystring';
import type {InferParsedQuery} from 'types/types';

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
