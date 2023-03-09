import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {Heading, TextInput, Link, Button} from 'components/components';
import {routes} from 'constants/constants';
import {useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';

import {fieldNames} from './consts';
import {useRegisterSubmit} from './useRegisterSubmit';

import type {FieldsValues} from './consts';

function RegisterFormTag() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {isLoading, registerSubmit} = useRegisterSubmit();

  const routeIsChanging = useRouteIsChanging();
  const hasMounted = useHasMounted();

  const {translate} = useTranslate('account.register');

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  const disabled = isLoading || routeIsChanging;

  return (
    <form
      onSubmit={handleSubmit(registerSubmit)}
      className='md:w-52 md:px-0 px-3 w-60'
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
        errorMessage={errors.email?.message}
        disabled={disabled}
      />
      <TextInput
        {...register(fieldNames.password, {
          required: true,
        })}
        type='password'
        label={translate('form.password')}
        errorMessage={errors.password?.message}
        disabled={disabled}
      />
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='text-xs mt-9 block'>
        {translate('form.login_link')}
      </Link>
    </form>
  );
}

export function RegisterForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <RegisterFormTag />
    </FormProvider>
  );
}
