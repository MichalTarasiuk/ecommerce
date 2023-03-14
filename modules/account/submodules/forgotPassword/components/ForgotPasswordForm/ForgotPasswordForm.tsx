import {useMemo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {H1, TextInput, Link, Button, Paragraph} from 'components/components';
import {routes} from 'constants/routes';
import {mergeRefs} from 'lib/mergeRefs';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';
import {focusInput} from 'utils/utils';

import {fieldNames} from './consts';
import {useForgotPasswordSubmit} from './useForgotPasswordSubmit';

import type {FieldsValues} from './consts';

function ForgotPasswordFormInner() {
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

  const {isLoading, forgotPasswordSubmit} = useForgotPasswordSubmit();
  const routeIsChanging = useRouteIsChanging();

  const disabled = routeIsChanging || isLoading;

  const {translate} = useTranslate('account.forgot-password');

  return (
    <form
      onSubmit={handleSubmit(forgotPasswordSubmit)}
      className='w-60 px-3 md:w-52 md:px-0'
      noValidate
    >
      <div>
        <H1 size='medium' weight='700'>
          {translate('form.title')}
        </H1>
        <Paragraph size='small'>{translate('form.description')}</Paragraph>
      </div>
      <TextInput
        {...emailInputHandler}
        ref={emailInputRef}
        type='email'
        label={translate('form.email')}
        errorMessage={errors.email?.message}
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

export function ForgotPasswordForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <ForgotPasswordFormInner />
    </FormProvider>
  );
}
