import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {i18nConfig} from '@root/i18n';

import type {InferParsedQuery} from '@/common/types/types';
import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export const getStaticPaths = () => {
  const paths = i18nConfig.locales.map((locale) => ({
    params: {
      locale,
      channel: 'default-channel',
    },
  }));

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
