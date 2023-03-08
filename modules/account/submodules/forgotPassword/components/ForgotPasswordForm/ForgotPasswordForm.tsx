import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

import {request} from 'app/queryClient/queryClient';
import {Heading, TextInput, Text, Link, Button} from 'components/components';
import {routes} from 'constants/routes';
import {requestPasswordResetMutation} from 'graphql/mutations/mutations';
import {useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/router';
import {useRegion} from 'lib/region/region';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  RequestPasswordResetMutation,
  RequestPasswordResetMutationVariables,
} from 'types/generated/graphql';

export function ForgotPasswordForm() {
  const {
    formState: {errors},
    register,
    handleSubmit,
    setError,
    reset,
  } = useForm<FieldsValues>();

  const {isLoading, mutateAsync: requestPasswordResetMutate} = useMutation<
    RequestPasswordResetMutation,
    unknown,
    RequestPasswordResetMutationVariables
  >((variables) => request(requestPasswordResetMutation, variables));

  const region = useRegion();
  const {translate} = useTranslate('account.forgot-password');

  const routeIsChanging = useRouteIsChanging();
  const hasMounted = useHasMounted();

  const submit = useCallback(
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

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  const disabled = routeIsChanging || isLoading;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='md:w-52 md:px-0 px-3 w-60'
      noValidate
    >
      <div>
        <Heading tag='h1' size='medium' weight='700'>
          {translate('form.title')}
        </Heading>
        <Text tag='p' size='small'>
          {translate('form.description')}
        </Text>
      </div>
      <TextInput
        {...emailInputHandler}
        ref={(emailInputElement) => {
          emailInputRef(emailInputElement);

          if (!hasMounted.current) {
            emailInputElement?.focus();
          }
        }}
        type='email'
        label={translate('form.email')}
        errorMessage={errors.email?.message}
        disabled={disabled}
      />
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='text-xs mt-9 block'>
        {translate('form.login_link')}
      </Link>
    </form>
  );
}
