import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

import {useLoginMutation} from 'graphql/generated/graphql';
import {session} from 'lib/session';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';

export const useLoginSubmit = () => {
  const {setError} = useFormContext<FieldsValues>();

  const loginMutation = useLoginMutation();

  const loginSubmit = useCallback(
    async ({email, password}: FieldsValues) => {
      const {token, csrfToken, errors} =
        (await loginMutation.mutateAsync({email, password})).tokenCreate ?? {};

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
    [loginMutation, setError],
  );

  return {
    loginSubmit,
    isLoading: loginMutation.isLoading,
  };
};
