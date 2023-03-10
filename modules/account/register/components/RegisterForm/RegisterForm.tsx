import {useMemo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {H1, TextInput, Link, Button} from 'components/components';
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
      className='w-60 px-3 md:w-52 md:px-0'
      noValidate
    >
      <H1 size='medium' weight='700'>
        {translate('form.title')}
      </H1>
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
      <Button type='submit' color='green' size='medium' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.login} className='mt-9 block text-xs'>
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
