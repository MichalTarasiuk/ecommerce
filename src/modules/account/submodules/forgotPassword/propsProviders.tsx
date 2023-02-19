import loadNamespaces from 'next-translate/loadNamespaces';

import {routes} from '@/common/consts/routes';
import {getRegion} from '@/common/utils/utils';

import type {GetServerSidePropsContext, GetStaticPropsResult} from 'next';

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const {locale} = getRegion(params);

  const namespaces = await loadNamespaces({
    locale,
    pathname: routes.account.forgotPassword,
  });

  return {
    props: {
      ...namespaces,
    },
  } satisfies GetStaticPropsResult<Record<PropertyKey, unknown>>;
};
