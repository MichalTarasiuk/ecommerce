import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {
  getRegion,
  isObject,
  isString,
  keyIn,
  regionToPathname,
} from '@/common/utils/utils';

import type {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

export const getServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext) => {
  const region = getRegion(params);

  if (
    isObject(query) &&
    keyIn(query, 'email') &&
    isString(query.email) &&
    keyIn(query, 'token') &&
    isString(query.token)
  ) {
    const {locale} = region;

    const namespaces = await loadNamespaces({
      locale,
      pathname: routes.account.changePassword,
    });

    return {
      props: {
        ...namespaces,
      },
    } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
  }

  const regionPathname = regionToPathname(region);

  return {
    redirect: {
      destination: `${regionPathname}${routes.account.forgotPassword}`,
      permanent: false,
    },
  } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
};
