import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import {request} from 'app/queryClient/queryClient';
import {loginMutation} from 'graphql/mutations/mutations';
import {session} from 'lib/session';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  LoginMutation,
  LoginMutationVariables,
} from 'types/generated/graphql';

export const useLoginSubmit = () => {
  const {setError} = useFormContext<FieldsValues>();

  const {isLoading, mutateAsync: loginMutate} = useMutation<
    LoginMutation,
    unknown,
    LoginMutationVariables
  >((variables) => request(loginMutation, variables));

  const loginSubmit = useCallback(
    async ({email, password}: FieldsValues) => {
      const {token, csrfToken, errors} =
        (await loginMutate({email, password})).tokenCreate ?? {};

      if (token && csrfToken) {
        session.login(token, csrfToken);

        return;
      }

      errors?.forEach((error) => {
        const fieldName = error.field;

        if (error.message && fieldName && isKeyof(fieldNames, fieldName)) {
          setError(fieldName, {message: error.message});
        }
      });
    },
    [loginMutate, setError],
  );

  return {
    isLoading,
    loginSubmit,
  };
};
