import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {
  getRegion,
  isObject,
  isString,
  keyIn,
  regionToPathname,
} from '@/common/utils/utils';

import type {GetServerSidePropsContext, GetStaticPropsResult} from 'next';

export const getServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext) => {
  if (
    isObject(query) &&
    keyIn(query, 'email') &&
    isString(query.email) &&
    keyIn(query, 'token') &&
    isString(query.token)
  ) {
    const {locale} = getRegion(params);

    const namespaces = await loadNamespaces({
      locale,
      pathname: routes.account.changePassword,
    });

    return {
      props: {
        ...namespaces,
      },
    } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
  }

  const region = getRegion(params);
  const regionPathname = regionToPathname(region);

  return {
    redirect: {
      destination: `${regionPathname}${routes.account.forgotPassword}`,
      permanent: false,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
