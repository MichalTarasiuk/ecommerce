import {QueryClient} from '@tanstack/react-query';

import {request} from '@/app/queryClient/request/request';
import {routes} from '@/common/consts/routes';
import {confirmAccountMutation} from '@/common/graphql/mutations/mutations';
import {
  isObject,
  isString,
  keyIn,
  getRegion,
  regionToPathname,
  isError,
} from '@/common/utils/utils';

import type {
  ConfirmAccountMutation,
  ConfirmAccountMutationVariables,
} from '@/common/graphql/generated/graphql';
import type {MutationObserverOptions} from '@tanstack/react-query';
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
    const queryClient = new QueryClient();

    const {email, token} = query;

    try {
      queryClient.setMutationDefaults(['confirm-account'], {
        mutationFn: (variables: ConfirmAccountMutationVariables) =>
          request<unknown, ConfirmAccountMutationVariables>(
            confirmAccountMutation,
            variables,
          ),
      });

      const confirmAccountMutationDefaults:
        | MutationObserverOptions<
            ConfirmAccountMutation,
            unknown,
            ConfirmAccountMutationVariables
          >
        | undefined = queryClient.getMutationDefaults(['confirm-account']);

      const {confirmAccount} =
        (await confirmAccountMutationDefaults?.mutationFn?.({
          email,
          token,
        })) ?? {};

      if (confirmAccount?.user?.isActive) {
        return {
          redirect: {
            destination: `${regionPathname}/${routes.account.login}`,
            permanent: false,
          },
        } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
      }
    } catch (error) {
      if (isError(error)) {
        console.log(error);
      }
    }
  }

  return {
    redirect: {
      destination: `${regionPathname}/${routes.home}`,
      permanent: false,
    },
  } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
};
