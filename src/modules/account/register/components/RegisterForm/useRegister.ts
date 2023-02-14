import {useCallback} from 'react';
import {useMutation} from 'urql';

import {routes} from '@/common/consts/routes';
import REGISTER_MUTATION from '@/common/graphql/mutations/Register.graphql';
import {useRegion} from '@/common/hooks/hooks';

import type {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/common/graphql/generated/graphql';

type Credentials = {
  readonly email: string;
  readonly password: string;
};

export const useRegister = () => {
  const [, registerMutation] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER_MUTATION);

  const region = useRegion();

  const register = useCallback(
    async (credentials: Credentials) => {
      const {locale: languageCode, channel} = region;
      const redirectUrl = `${window.location.origin}${routes.account.confirm}`;

      await registerMutation({
        input: {
          ...credentials,
          languageCode,
          channel,
          redirectUrl,
        },
      });
    },
    [region, registerMutation],
  );

  return register;
};
