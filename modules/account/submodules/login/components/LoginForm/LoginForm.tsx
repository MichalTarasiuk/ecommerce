import {useRouter} from 'next/router';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {toast} from 'sonner';

import {Heading, TextInput, Text, Link, Button} from 'components/components';
import {routes} from 'constants/constants';
import {useEffectOnce, useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';
import {hasOwn, isObject} from 'utils/utils';

import {fieldNames} from './consts';
import {useLoginSubmit} from './useLoginSubmit';

import type {FieldsValues} from './consts';

function LoginFormTag() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {isLoading, loginSubmit} = useLoginSubmit();

  const router = useRouter();
  const routeIsChanging = useRouteIsChanging();

  const hasMounted = useHasMounted();

  const {translate} = useTranslate('account.login');

  useEffectOnce(() => {
    if (
      isObject(router.query) &&
      hasOwn(router.query, 'confirm') &&
      true.toString() === router.query.confirm
    ) {
      toast.success(translate('toast_confirm_account_message'));
    }
  });

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  const disabled = isLoading || routeIsChanging;

  return (
    <form
      onSubmit={handleSubmit(loginSubmit)}
      className='md:w-52 md:px-0 px-3 w-60'
      noValidate
    >
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
        className='text-xs mb-4 block text-blue-600'
      >
        {translate('form.forgot_password_text')}
      </Link>
      <Button type='submit' variant='green' disabled={disabled}>
        {translate('form.submit_button_text')}
      </Button>
      <Link href={routes.account.register} className='text-xs mt-9 block'>
        {translate('form.register_link')}
      </Link>
    </form>
  );
}

export function LoginForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <LoginFormTag />
    </FormProvider>
  );
}
