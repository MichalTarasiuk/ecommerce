import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

import {session} from '@/app/hooks/useSession';
import {request} from '@/app/queryClient/queryClient';
import {
  Heading,
  TextInput,
  Text,
  Link,
  Button,
} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import {loginMutation} from '@/common/graphql/mutations/mutations';
import {
  useTranslate,
  useHasMounted,
  useRouteIsChanging,
  useMount,
} from '@/common/hooks/hooks';
import {hasOwn, isKeyof, isObject} from '@/common/utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  LoginMutation,
  LoginMutationVariables,
} from '@/common/types/generated/graphql';

export function LoginForm() {
  const {
    formState: {errors: errorsState},
    register,
    handleSubmit,
    setError,
  } = useForm<FieldsValues>();

  const {isLoading, mutateAsync: loginMutate} = useMutation<
    LoginMutation,
    unknown,
    LoginMutationVariables
  >((variables) => request(loginMutation, variables));

  const {translate} = useTranslate('account.login');

  const router = useRouter();
  const routeIsChanging = useRouteIsChanging();

  const hasMounted = useHasMounted();

  useMount(() => {
    if (
      isObject(router.query) &&
      hasOwn(router.query, 'confirm') &&
      true.toString() === router.query.confirm
    ) {
      toast.success(translate('toast_confirm_account_message'));
    }
  });

  const submit = useCallback(
    async ({email, password}: FieldsValues) => {
      const {token, csrfToken, errors} =
        (await loginMutate({email, password})).tokenCreate ?? {};

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
    [loginMutate, setError],
  );

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  const disabled = isLoading || routeIsChanging;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className='md:w-52 md:px-0 px-3 w-60'
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
        errorMessage={errorsState.email?.message}
        disabled={disabled}
      />
      <TextInput
        {...register(fieldNames.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
        errorMessage={errorsState.password?.message}
        disabled={disabled}
      />
      <Link
        href={routes.account.forgotPassword}
        className='text-xs mb-4 block text-blue-600'
      >
        {translate('form.forgot_password_text')}
      </Link>
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.register} className='text-xs mt-9 block'>
        {translate('form.register_link')}
      </Link>
    </form>
  );
}
