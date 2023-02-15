import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'urql';

import {Heading, TextInput} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import REGISTER_MUTATION from '@/common/graphql/mutations/Register.graphql';
import {useTranslate, useRegion} from '@/common/hooks/hooks';

import {fieldValues, isFieldValue} from './helpers';

import type {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/common/graphql/generated/graphql';

export function RegisterForm() {
  const [, registerMutation] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER_MUTATION);

  const {register, handleSubmit, setError} = useForm<typeof fieldValues>();

  const region = useRegion();
  const {translate} = useTranslate('account.register');

  const submit = useCallback(
    async (values: Record<keyof typeof fieldValues, string>) => {
      const redirectUrl = `${window.location.origin}${routes.account.confirm}`;

      const {data} = await registerMutation({
        input: {
          ...values,
          ...region,
          redirectUrl,
        },
      });

      data?.accountRegister?.errors.forEach((error) => {
        if (error.field && error.message && isFieldValue(error.field)) {
          setError(error.field, {message: error.message});
        }
      });
    },
    [region, registerMutation, setError],
  );

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-md'>
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...register(fieldValues.email, {
          required: true,
        })}
        type='email'
        label={translate('form.email')}
      />
      <TextInput
        {...register(fieldValues.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
      />
    </form>
  );
}
