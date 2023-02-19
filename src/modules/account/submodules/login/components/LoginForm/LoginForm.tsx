import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {authorizationHandler} from '@/app/hooks/useAuthorization';
import {request} from '@/app/queryClient/request/request';
import {
  Heading,
  TextInput,
  Text,
  Link,
  Button,
} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import {loginMutation} from '@/common/graphql/mutations/mutations';
import {useTranslate, useHasMounted} from '@/common/hooks/hooks';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  LoginMutation,
  LoginMutationVariables,
} from '@/common/graphql/generated/graphql';

export function LoginForm() {
  const {mutateAsync: loginMutate} = useMutation<
    LoginMutation,
    unknown,
    LoginMutationVariables
  >({
    mutationFn: (variables) =>
      request<LoginMutation, LoginMutationVariables>(loginMutation, variables),
  });

  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useForm<FieldsValues>();

  const {translate} = useTranslate('account.login');

  const hasMounted = useHasMounted();

  const submit = useCallback(
    async ({email, password}: FieldsValues) => {
      const {token, csrfToken, errors} =
        (await loginMutate({email, password})).tokenCreate ?? {};

      if (token && csrfToken) {
        authorizationHandler.login(token, csrfToken);
      }

      errors?.forEach(() => {
        // if (error.field && error.message && keyIn(errors, error.field)) {
        //   setError(error.field, {message: error.message});
        // }
      });
    },
    [loginMutate],
  );

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='max-w-md md:p-0 px-4'
      noValidate
    >
      <div>
        <Text tag='span' size='small'>
          {translate('form.pre_title')}
        </Text>
        <Heading tag='h1' size='medium' weight='700'>
          {translate('form.title')}
        </Heading>
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
      />
      <TextInput
        {...register(fieldNames.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
        errorMessage={errors.password?.message}
      />
      <Link
        href={routes.account.forgotPassword}
        className='text-xs mb-4 block text-blue-600'
      >
        {translate('form.forgot_password_text')}
      </Link>
      <Button type='submit' variant='green'>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.register} className='text-xs mt-9 block'>
        {translate('form.register_link')}
      </Link>
    </form>
  );
}
