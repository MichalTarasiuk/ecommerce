import {QueryClient} from '@tanstack/react-query';
import loadNamespaces from 'next-translate/loadNamespaces';

import {request} from '@/app/queryClient/request/request';
import {routes} from '@/common/consts/routes';
import {verifyTokenMutation} from '@/common/graphql/mutations/verifyTokenMutation';
import {
  getRegion,
  isObject,
  isString,
  keyIn,
  regionToPathname,
} from '@/common/utils/utils';

import type {
  VerifyTokenMutation,
  VerifyTokenMutationVariables,
} from '@/common/graphql/generated/graphql';
import type {MutationObserverOptions} from '@tanstack/react-query';
import type {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';

export const getServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext) => {
  const region = getRegion(params);
  const regionPathname = regionToPathname(region);

  const fallbackResult = getFallbackResult(regionPathname);

  if (
    isObject(query) &&
    keyIn(query, 'email') &&
    isString(query.email) &&
    keyIn(query, 'token') &&
    isString(query.token)
  ) {
    const queryClient = new QueryClient();

    const {token} = query;
    const {locale} = region;

    queryClient.setMutationDefaults(['verify-token'], {
      mutationFn: (variables: VerifyTokenMutationVariables) =>
        request<unknown, VerifyTokenMutationVariables>(
          verifyTokenMutation,
          variables,
        ),
    });

    const verifyTokenMutationDefaults:
      | MutationObserverOptions<
          VerifyTokenMutation,
          unknown,
          VerifyTokenMutationVariables
        >
      | undefined = queryClient.getMutationDefaults(['verify-token']);

    const {isValid = false} =
      (await verifyTokenMutationDefaults?.mutationFn?.({token}))?.tokenVerify ??
      {};

    if (!isValid) {
      return fallbackResult;
    }

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

  return fallbackResult;
};

const getFallbackResult = (regionPathname: string) => {
  return {
    redirect: {
      destination: `${regionPathname}${routes.account.forgotPassword}`,
      permanent: false,
    },
  } satisfies GetServerSidePropsResult<Record<PropertyKey, unknown>>;
};
