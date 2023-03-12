import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {routes} from 'constants/constants';
import {useForgotPasswordMutation} from 'graphql/generated/graphql';
import {useRegion} from 'lib/region/region';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';

export const useForgotPasswordSubmit = () => {
  const {reset, setError} = useFormContext<FieldsValues>();

  const forgotPasswordMutation = useForgotPasswordMutation();

  const region = useRegion();
  const {translate} = useTranslate('account.forgot-password');

  const forgotPasswordSubmit = useCallback(
    async ({email}: FieldsValues) => {
      const {channel} = region.variables;
      const redirectUrl = `${window.location.origin}${region.pathname}${routes.account.changePassword}`;

      const {forgotPassword} = await forgotPasswordMutation?.mutateAsync({
        email,
        channel,
        redirectUrl,
      });

      if (!forgotPassword?.errors?.length) {
        reset();

        toast.success(translate('toast_success_message'));

        return;
      }

      forgotPassword?.errors?.forEach((error) => {
        const fieldName = error.field;

        if (error.message && fieldName && isKeyof(fieldNames, fieldName)) {
          setError(fieldName, {message: error.message});
        }
      });
    },
    [
      forgotPasswordMutation,
      region.pathname,
      region.variables,
      reset,
      setError,
      translate,
    ],
  );

  return {
    forgotPasswordSubmit,
    isLoading: forgotPasswordMutation.isLoading,
  };
};
