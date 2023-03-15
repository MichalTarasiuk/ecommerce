import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import {useChangePasswordMutation} from 'graphql/generated/graphql';
import {session} from 'lib/session';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';
import {getToken} from './helpers';

import type {FieldsValues} from './consts';

export const useChangePasswordSubmit = () => {
  const {setError} = useFormContext();

  const changePasswordMutation = useChangePasswordMutation();

  const {query} = useRouter();

  const changePasswordSubmit = useCallback(
    async ({email, password}: FieldsValues) => {
      const queryToken = getToken(query);

      if (queryToken) {
        const {errors, token, csrfToken} =
          (
            await changePasswordMutation.mutateAsync({
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
    [changePasswordMutation, query, setError],
  );

  return {
    changePasswordSubmit,
    isLoading: changePasswordMutation.isLoading,
  };
};
