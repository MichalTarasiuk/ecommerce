import {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {
  Heading,
  TextInput,
  Text,
  Link,
  Button,
} from '@/common/components/components';
import {routes} from '@/common/consts/routes';
import {useTranslate, useHasMounted} from '@/common/hooks/hooks';

import {fieldNames} from './helpers';

import type {FieldsValues} from './helpers';

export function LoginForm() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useForm<FieldsValues>();

  const {translate} = useTranslate('account.login');

  const hasMounted = useHasMounted();

  const submit = useCallback(async (_fieldsValues: FieldsValues) => {}, []);

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  return (
    <form onSubmit={handleSubmit(submit)} className='max-w-md' noValidate>
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
        {translate('login_link')}
      </Link>
    </form>
  );
}
