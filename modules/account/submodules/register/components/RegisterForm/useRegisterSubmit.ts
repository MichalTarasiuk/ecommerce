import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {request} from 'app/queryClient/queryClient';
import {routes} from 'constants/constants';
import {registerMutation} from 'graphql/mutations/mutations';
import {useRegion} from 'lib/region/region';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  RegisterMutation,
  RegisterMutationVariables,
} from 'types/generated/graphql';

export const useRegisterSubmit = () => {
  const {reset, setError} = useFormContext<FieldsValues>();
  const region = useRegion();

  const {isLoading, mutateAsync: registerMutate} = useMutation<
    RegisterMutation,
    unknown,
    RegisterMutationVariables
  >((variables) => request(registerMutation, variables));

  const {translate} = useTranslate('account.register');

  const registerSubmit = useCallback(
    async (fieldsValues: FieldsValues) => {
      const redirectUrl = `${window.location.origin}${region.pathname}${routes.account.confirm}`;

      const {accountRegister} = await registerMutate({
        input: {
          ...fieldsValues,
          ...region.variables,
          redirectUrl,
        },
      });

      const canResetForm = accountRegister?.errors.length === 0;

      if (canResetForm) {
        reset();

        toast.success(translate('toast_success_message'));

        return;
      }

      accountRegister?.errors?.forEach((error) => {
        const fieldName = error.field;

        if (error.message && fieldName && isKeyof(fieldNames, fieldName)) {
          setError(fieldName, {message: error.message});
        }
      });
    },
    [
      region.pathname,
      region.variables,
      registerMutate,
      reset,
      setError,
      translate,
    ],
  );

  return {
    isLoading,
    registerSubmit,
  };
};
