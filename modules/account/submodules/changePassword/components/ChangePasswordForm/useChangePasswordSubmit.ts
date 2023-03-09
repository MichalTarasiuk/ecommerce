import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import {request} from 'app/queryClient/queryClient';
import {changePasswordMutation} from 'graphql/mutations/mutations';
import {session} from 'lib/session';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';
import {getToken} from './helpers';

import type {FieldsValues} from './consts';
import type {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from 'types/generated/graphql';

export const useChangePasswordSubmit = () => {
  const {setError} = useFormContext();

  const {isLoading, mutateAsync: changePasswordMutate} = useMutation<
    ChangePasswordMutation,
    unknown,
    ChangePasswordMutationVariables
  >((variables) => request(changePasswordMutation, variables));

  const {query} = useRouter();

  const changePasswordSubmit = useCallback(
    async ({email, password}: FieldsValues) => {
      const queryToken = getToken(query);

      if (queryToken) {
        const {errors, token, csrfToken} =
          (
            await changePasswordMutate({
              email,
              password,
              token: queryToken,
            })
          ).setPassword ?? {};

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
      }
    },
    [changePasswordMutate, query, setError],
  );

  return {
    isLoading,
    changePasswordSubmit,
  };
};
