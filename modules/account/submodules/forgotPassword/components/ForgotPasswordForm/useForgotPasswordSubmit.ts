import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {request} from 'app/queryClient/queryClient';
import {routes} from 'constants/constants';
import {requestPasswordResetMutation} from 'graphql/mutations/mutations';
import {useRegion} from 'lib/region/region';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
} from 'types/generated/graphql';

export const useForgotPasswordSubmit = () => {
  const {reset, setError} = useFormContext<FieldsValues>();

  const {isLoading, mutateAsync: requestPasswordResetMutate} = useMutation<
    RequestPasswordResetMutation,
    unknown,
    RequestPasswordResetMutationVariables
  >((variables) => request(requestPasswordResetMutation, variables));

  const region = useRegion();
  const {translate} = useTranslate('account.forgot-password');

  const forgotPasswordSubmit = useCallback(
    async ({email}: FieldsValues) => {
      const {channel} = region.variables;
      const redirectUrl = `${window.location.origin}${region.pathname}${routes.account.changePassword}`;

      const {requestPasswordReset} = await requestPasswordResetMutate({
        email,
        channel,
        redirectUrl,
      });

      if (requestPasswordReset?.errors.length === 0) {
        reset();

        toast.success(translate('toast_success_message'));

        return;
      }

      requestPasswordReset?.errors.forEach((error) => {
        const fieldName = error.field;

        if (error.message && fieldName && isKeyof(fieldNames, fieldName)) {
          setError(fieldName, {message: error.message});
        }
      });
    },
    [
      region.pathname,
      region.variables,
      requestPasswordResetMutate,
      reset,
      setError,
      translate,
    ],
  );

  return {
    isLoading,
    forgotPasswordSubmit,
  };
};
