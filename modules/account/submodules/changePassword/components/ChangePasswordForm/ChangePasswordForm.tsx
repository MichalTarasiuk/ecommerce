import {useRouter} from 'next/router';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {Heading, TextInput, Button} from 'components/components';
import {useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';

import {fieldNames} from './consts';
import {getDefaultValues} from './helpers';
import {useChangePasswordSubmit} from './useChangePasswordSubmit';

import type {FieldsValues} from './consts';

function ChangePasswordFormTag() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {isLoading, changePasswordSubmit} = useChangePasswordSubmit();

  const routeIsChanging = useRouteIsChanging();
  const hasMounted = useHasMounted();

  const {translate} = useTranslate('account.change-password');

  const {ref: passwordInputRef, ...passwordInputHandler} = register(
    fieldNames.password,
    {
      required: true,
    },
  );

  const disabled = routeIsChanging || isLoading;

  return (
    <form
      onSubmit={handleSubmit(changePasswordSubmit)}
      className='md:w-52 md:px-0 px-3 w-60'
      noValidate
    >
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...register(fieldNames.email, {
          required: true,
        })}
        type='email'
        label={translate('form.email')}
        errorMessage={errors.email?.message}
        disabled={disabled}
      />
      <TextInput
        {...passwordInputHandler}
        ref={(passwordInputElement) => {
          passwordInputRef(passwordInputElement);

          if (!hasMounted.current) {
            passwordInputElement?.focus();
          }
        }}
        type='password'
        label={translate('form.password')}
        errorMessage={errors.password?.message}
        disabled={disabled}
      />
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
    </form>
  );
}

export function ChangePasswordForm() {
  const {query} = useRouter();
  const form = useForm({
    defaultValues: getDefaultValues(query),
  });

  return (
    <FormProvider {...form}>
      <ChangePasswordFormTag />
    </FormProvider>
  );
}
