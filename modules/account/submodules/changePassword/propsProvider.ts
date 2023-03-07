import loadNamespaces from 'next-translate/loadNamespaces';

import {getRegion, regionToPathname} from '~composables/region/region';
import {routes} from '~constants/constants';
import {isObject, isString, hasOwn} from '~utils/utils';

import type {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

export const getServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext) => {
  const region = getRegion(params);

  if (
    isObject(query) &&
    hasOwn(query, 'email') &&
    isString(query.email) &&
    hasOwn(query, 'token') &&
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
