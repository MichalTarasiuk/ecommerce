import {FormProvider, useForm, useFormContext} from 'react-hook-form';

import {Heading, TextInput, Text, Link, Button} from 'components/components';
import {routes} from 'constants/routes';
import {useHasMounted} from 'lib/lifecycle';
import {useRouteIsChanging} from 'lib/nextRouter/nextRouter';
import {useTranslate} from 'lib/translate/translate';

import {fieldNames} from './consts';
import {useForgotPasswordSubmit} from './useForgotPasswordSubmit';

import type {FieldsValues} from './consts';

function ForgotPasswordFormTag() {
  const {
    formState: {errors},
    register,
    handleSubmit,
  } = useFormContext<FieldsValues>();

  const {isLoading, forgotPasswordSubmit} = useForgotPasswordSubmit();

  const routeIsChanging = useRouteIsChanging();
  const hasMounted = useHasMounted();

  const {translate} = useTranslate('account.forgot-password');

  const {ref: emailInputRef, ...emailInputHandler} = register(
    fieldNames.email,
    {
      required: true,
    },
  );

  const disabled = routeIsChanging || isLoading;

  return (
    <form
      onSubmit={handleSubmit(forgotPasswordSubmit)}
      className='md:w-52 md:px-0 px-3 w-60'
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

export function ForgotPasswordForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <ForgotPasswordFormTag />
    </FormProvider>
  );
}
