import {useMemo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {Heading, TextInput, Link, Button} from 'components/components';
import {routes} from 'constants/constants';
import {mergeRefs} from 'lib/mergeRefs';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';
import {focusInput} from 'utils/utils';

import {fieldNames} from './consts';
import {useRegisterSubmit} from './useRegisterSubmit';

import type {FieldsValues} from './consts';

function RegisterFormInner() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {ref: registerEmailInput, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );
  const emailInputRef = useMemo(
    () => mergeRefs<HTMLInputElement>(registerEmailInput, focusInput),
    [registerEmailInput],
  );

  const {isLoading, registerSubmit} = useRegisterSubmit();
  const routeIsChanging = useRouteIsChanging();

  const disabled = isLoading || routeIsChanging;

  const {translate} = useTranslate('account.register');

  return (
    <form
      onSubmit={handleSubmit(registerSubmit)}
      className='px-3 md:w-52 md:px-0 w-60'
      noValidate
    >
      <Heading tag='h1' size='medium' weight='700'>
        {translate('form.title')}
      </Heading>
      <TextInput
        {...emailInputHandler}
        ref={emailInputRef}
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
      <Link href={routes.account.login} className='block text-xs mt-9'>
        {translate('form.login_link')}
      </Link>
    </form>
  );
}

export function RegisterForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <RegisterFormInner />
    </FormProvider>
  );
}
