import {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from 'urql';

import {Heading, TextInput, Link, Button} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import REGISTER_MUTATION from '@/common/graphql/mutations/Register.graphql';
import {useTranslate, useRegion} from '@/common/hooks/hooks';

import {fieldNames} from './helpers';

import type {FieldsNames, FieldsValues} from './helpers';
import type {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/common/graphql/generated/graphql';

export function RegisterForm() {
  const [, registerMutation] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER_MUTATION);

  const {register, handleSubmit} = useForm<FieldsNames>();

  const region = useRegion();
  const {translate} = useTranslate('account.register');

  const submit = useCallback(
    async (fieldsValues: FieldsValues) => {
      const redirectUrl = `${window.location.origin}${routes.account.confirm}`;

      await registerMutation({
        input: {
          ...fieldsValues,
          ...region.variables,
          redirectUrl,
        },
      });

      // TODO: fix graphql codegen
      // data?.accountRegister?.errors.forEach((error) => {
      //   if (error.field && error.message && isFieldValue(error.field)) {
      //     setError(error.field, {message: error.message});
      //   }
      // });
    },
    [region, registerMutation],
  );

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-md'>
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...register(fieldNames.email, {
          required: true,
        })}
        type='email'
        label={translate('form.email')}
      />
      <TextInput
        {...register(fieldNames.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
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
