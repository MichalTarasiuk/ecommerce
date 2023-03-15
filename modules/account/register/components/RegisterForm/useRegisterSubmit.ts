import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {routes} from 'constants/constants';
import {useRegisterMutation} from 'graphql/generated/graphql';
import {useRegion} from 'lib/region/region';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';

export const useRegisterSubmit = () => {
  const {reset, setError} = useFormContext<FieldsValues>();

  const registerMutation = useRegisterMutation();

  const region = useRegion();
  const {translate} = useTranslate('account.register');

  const registerSubmit = useCallback(
    async (fieldsValues: FieldsValues) => {
      const redirectUrl = `${window.location.origin}${region.pathname}${routes.account.confirm}`;

      const {accountRegister} = await registerMutation.mutateAsync({
        input: {
          ...fieldsValues,
          ...region.variables,
          redirectUrl,
        },
      });

      if (!accountRegister?.errors.length) {
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
      registerMutation,
      reset,
      setError,
      translate,
    ],
  );

  return {
    registerSubmit,
    isLoading: registerMutation.isLoading,
  };
};
