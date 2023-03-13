import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {TextInput, Button, H1} from 'components/components';
import {mergeRefs} from 'lib/mergeRefs';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';
import {focusInput} from 'utils/utils';

import {fieldNames} from './consts';
import {getDefaultValues} from './helpers';
import {useChangePasswordSubmit} from './useChangePasswordSubmit';

import type {FieldsValues} from './consts';

function ChangePasswordFormInner() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {ref: registerPasswordInput, ...passwordInputHandler} = register(
    fieldNames.password,
    {
      required: true,
    },
  );
  const passwordInputRef = useMemo(
    () => mergeRefs<HTMLInputElement>(registerPasswordInput, focusInput),
    [registerPasswordInput],
  );

  const {isLoading, changePasswordSubmit} = useChangePasswordSubmit();
  const routeIsChanging = useRouteIsChanging();

  const disabled = routeIsChanging || isLoading;

  const {translate} = useTranslate('account.change-password');

  return (
    <form
      onSubmit={handleSubmit(changePasswordSubmit)}
      className='px-3 md:w-52 md:px-0 w-60'
      noValidate
    >
      <H1 size='medium' weight='700'>
        {translate('form.title')}
      </H1>
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
        ref={passwordInputRef}
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
      <ChangePasswordFormInner />
    </FormProvider>
  );
}
