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

import {fieldNames} from './consts';

import type {FieldsValues} from './consts';

export function ForgotPasswordForm() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useForm<FieldsValues>();

  const {translate} = useTranslate('account.forgot-password');

  const hasMounted = useHasMounted();

  const submit = useCallback(async (_fieldsValues: FieldsValues) => {}, []);

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
        <Heading tag='h1' size='medium' weight='700'>
          {translate('form.title')}
        </Heading>
        <Text tag='p' size='small'>
          {translate('form.description')}
        </Text>
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
      <Button type='submit' variant='green'>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='text-xs mt-9 block'>
        {translate('form.login_link')}
      </Link>
    </form>
  );
}
