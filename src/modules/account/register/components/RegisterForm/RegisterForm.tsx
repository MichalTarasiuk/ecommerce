import {useForm} from 'react-hook-form';

import {Heading, TextInput} from '@/common/components/components';

import {useRegister} from './useRegister';

type FieldValues = typeof fieldValues;

export function RegisterForm() {
  const register = useRegister();
  const {register: registerInput, handleSubmit} = useForm<FieldValues>();

  return (
    <form onSubmit={handleSubmit(register)} className='max-w-md'>
      <Heading tag='h1' size='medium' weight='700'>
        Create a new account
      </Heading>
      <TextInput
        {...registerInput(fieldValues.email, {
          required: true,
        })}
        type='email'
        label='Email'
      />
      <TextInput
        {...registerInput(fieldValues.password, {
          required: true,
        })}
        type='password'
        label='Password'
      />
    </form>
  );
}

const fieldValues = {
  email: 'email',
  password: 'password',
} as const;
