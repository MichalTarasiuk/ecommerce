import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {request} from '@/app/queryClient/request/request';
import {Heading, TextInput, Link, Button} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import {registerMutation} from '@/common/graphql/mutations/mutations';
import {useTranslate, useRegion, useHasMounted} from '@/common/hooks/hooks';
import {isKeyof} from '@/common/utils/utils';

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';
import type {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/common/graphql/generated/graphql';

export function RegisterForm() {
  const {
    formState: {errors: errorsState},
    register,
    handleSubmit,
    setError,
  } = useForm<FieldsValues>();

  const {isLoading, mutateAsync: registerMutate} = useMutation<
    RegisterMutation,
    unknown,
    RegisterMutationVariables
  >({
    mutationFn: (variables) =>
      request<RegisterMutation, RegisterMutationVariables>(
        registerMutation,
        variables,
      ),
  });

  const region = useRegion();
  const {translate} = useTranslate('account.register');

  const hasMounted = useHasMounted();

  const submit = useCallback(
    async (fieldsValues: FieldsValues) => {
      const redirectUrl = `${window.location.origin}${region.pathname}${routes.account.confirm}`;

      const {accountRegister} = await registerMutate({
        input: {
          ...fieldsValues,
          ...region.variables,
          redirectUrl,
        },
      });

      accountRegister?.errors?.forEach((error) => {
        const fieldName = error.field;

        if (error.message && fieldName && isKeyof(fieldNames, fieldName)) {
          setError(fieldName, {message: error.message});
        }
      });
    },
    [region.pathname, region.variables, registerMutate, setError],
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
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
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
      />
      <TextInput
        {...register(fieldNames.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
        errorMessage={errorsState.password?.message}
      />
      <Button type='submit' variant='green' disabled={isLoading}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='text-xs mt-9 block'>
        {translate('form.login_link')}
      </Link>
    </form>
  );
}
