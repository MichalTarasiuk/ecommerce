import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'urql';

import {Heading, TextInput, Link, Button} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import {registerMutation} from '@/common/graphql/mutations/mutations';
import {useTranslate, useRegion, useHasMounted} from '@/common/hooks/hooks';

import {fieldNames} from './helpers';

import type {FieldsValues} from './helpers';
import type {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/common/graphql/generated/graphql';

export function RegisterForm() {
  const [, registerMutate] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(registerMutation);

  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useForm<FieldsValues>();

  const region = useRegion();
  const {translate} = useTranslate('account.register');

  const hasMounted = useHasMounted();

  const submit = useCallback(
    async (fieldsValues: FieldsValues) => {
      const redirectUrl = `${window.location.origin}${routes.account.confirm}`;

      const {data} = await registerMutate({
        input: {
          ...fieldsValues,
          ...region.variables,
          redirectUrl,
        },
      });

      data?.accountRegister?.errors.forEach(() => {
        // if (error.field && error.message && isFieldValue(error.field)) {
        //   setError(error.field, {message: error.message});
        // }
      });
    },
    [region.variables, registerMutate],
  );

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-md' noValidate>
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...emailInputHandler}
        ref={(emailInputElement) => {
          emailInputRef(emailInputElement);

          if (!hasMounted) {
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
      <Button type='submit' variant='green'>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='text-xs mt-9 block'>
        {translate('login_link')}
      </Link>
    </form>
  );
}
