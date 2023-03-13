import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {TextInput, Text, Link, Button, H1} from 'components/components';
import {routes, truthy} from 'constants/constants';
import {useEffectOnce} from 'lib/lifecycle';
import {mergeRefs} from 'lib/mergeRefs';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';
import {focusInput, hasOwn, isObject} from 'utils/utils';

import {fieldNames} from './consts';
import {useLoginSubmit} from './useLoginSubmit';

import type {FieldsValues} from './consts';

function LoginFormInner() {
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

  const {isLoading, loginSubmit} = useLoginSubmit();

  const router = useRouter();
  const routeIsChanging = useRouteIsChanging();

  const {translate} = useTranslate('account.login');

  useEffectOnce(() => {
    if (
      isObject(router.query) &&
      hasOwn(router.query, 'confirm') &&
      truthy.toString() === router.query.confirm
    ) {
      toast.success(translate('toast_confirm_account_message'));
    }
  });

  const disabled = isLoading || routeIsChanging;

  return (
    <form
      onSubmit={handleSubmit(loginSubmit)}
      className='px-3 md:w-52 md:px-0 w-60'
      noValidate
    >
      <div>
        <Text tag='span' size='small'>
          {translate('form.pre_title')}
        </Text>
        <H1 size='medium' weight='700'>
          {translate('form.title')}
        </H1>
      </div>
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
      <Link
        href={routes.account.forgotPassword}
        className='block mb-4 text-xs text-blue-600'
      >
        {translate('form.forgot_password_text')}
      </Link>
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.register} className='block text-xs mt-9'>
        {translate('form.register_link')}
      </Link>
    </form>
  );
}

export function LoginForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <LoginFormInner />
    </FormProvider>
  );
}
