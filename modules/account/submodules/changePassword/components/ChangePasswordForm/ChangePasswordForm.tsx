import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {request} from 'app/queryClient/queryClient';
import {Heading, TextInput, Button} from 'components/components';
import {changePasswordMutation} from 'graphql/mutations/mutations';
import {useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/router';
import {session} from 'lib/session';
import {useTranslate} from 'lib/translate/translate';
import {isKeyof} from 'utils/utils';

import {fieldNames} from './consts';
import {getDefaultValues, getToken} from './helpers';

import type {FieldsValues} from './consts';
import type {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from 'types/generated/graphql';

export function ChangePasswordForm() {
  const {query} = useRouter();
  const {
    formState: {errors},
    register,
    handleSubmit,
    setError,
  } = useForm<FieldsValues>({
    defaultValues: getDefaultValues(query),
  });

  const {isLoading, mutateAsync: changePasswordMutate} = useMutation<
    ChangePasswordMutation,
    unknown,
    ChangePasswordMutationVariables
  >((variables) => request(changePasswordMutation, variables));

  const {translate} = useTranslate('account.change-password');

  const routeIsChanging = useRouteIsChanging();
  const hasMounted = useHasMounted();

  const submit = useCallback(
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

  const {ref: passwordInputRef, ...passwordInputHandler} = register(
    fieldNames.password,
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
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...register(fieldNames.email, {
          required: true,
        })}
        type='email'
        label={translate('form.email')}
        errorMessage={errors.email?.message}
        disabled={disabled}
      />
      <TextInput
        {...passwordInputHandler}
        ref={(passwordInputElement) => {
          passwordInputRef(passwordInputElement);

          if (!hasMounted.current) {
            passwordInputElement?.focus();
          }
        }}
        type='password'
        label={translate('form.password')}
        errorMessage={errors.password?.message}
        disabled={disabled}
      />
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
    </form>
  );
}
