import {createUrqlClient} from '@/app/queryClient/queryClient';
import {routes} from '@/common/consts/routes';
import CONFIRM_ACCOUNT_MUTATE from '@/common/graphql/mutations/ConfirmAccount.graphql';
import {isObject, isString, keyIn} from '@/common/utils/utils';
import {getRegion, regionToPathname} from '@/modules/core/utils/utils';

import type {
  ConfirmAccountMutation,
  ConfirmAccountMutationVariables,
} from '@/common/graphql/generated/graphql';
import type {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

export const getServerSideProps = async ({
  query,
  params,
}: GetServerSidePropsContext) => {
  const region = getRegion(params);
  const regionPathname = regionToPathname(region);

  if (
    isObject(query) &&
    keyIn(query, 'email') &&
    isString(query.email) &&
    keyIn(query, 'token') &&
    isString(query.token)
  ) {
    const {email, token} = query;

    const urqlClient = createUrqlClient();

    const {data, error} = await urqlClient
      .mutation<ConfirmAccountMutation, ConfirmAccountMutationVariables>(
        CONFIRM_ACCOUNT_MUTATE,
        {email, token},
      )
      .toPromise();

    if (error) {
      console.log(error.message);
    }

    if (data?.confirmAccount?.user?.isActive) {
      return {
        redirect: {
          destination: `${regionPathname}/${routes.account.login}`,
          permanent: false,
        },
      } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
    }
  }

  return {
    redirect: {
      destination: `${regionPathname}/${routes.home}`,
      permanent: false,
    },
  } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
};
