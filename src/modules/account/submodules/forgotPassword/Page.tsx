import {
  FormWrapper,
  ProtectedPage,
} from '@/modules/account/components/components';

import {ForgotPasswordForm} from './components/ForgotPasswordForm/ForgotPasswordForm';

export function AccountForgotPasswordPage() {
  return (
    <ProtectedPage>
      <FormWrapper>
        <ForgotPasswordForm />
      </FormWrapper>
    </ProtectedPage>
  );
}
