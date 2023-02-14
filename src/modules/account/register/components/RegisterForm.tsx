// TODO: add logic of submit
import {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {Heading, TextInput} from '@/common/components/components';
import {useChannel} from '@/common/hooks/hooks';

type FieldValues = typeof fieldValues;

const fieldValues = {
  email: 'email',
  password: 'password',
} as const;

export function RegisterForm() {
  const {register, handleSubmit} = useForm<FieldValues>();

  useChannel();

  const submit = useCallback((_fieldValues: FieldValues) => {}, []);

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-md'>
      <Heading tag='h1' size='medium' weight='700'>
        Create a new account
      </Heading>
      <TextInput
        {...register(fieldValues.email, {
          required: true,
        })}
        type='email'
        label='Email'
      />
      <TextInput
        {...register(fieldValues.password, {
          required: true,
        })}
        type='password'
        label='Password'
      />
    </form>
  );
}
