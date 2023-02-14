import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {getRegion} from '@/modules/core/utils/utils';

import type {GetServerSidePropsContext, GetStaticPropsResult} from 'next';

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const {localeName} = getRegion(params);

  const namespaces = await loadNamespaces({
    locale: localeName,
    pathname: routes.account.register,
  });

  return {
    props: {
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
