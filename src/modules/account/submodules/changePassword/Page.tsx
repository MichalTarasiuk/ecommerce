import {
  FormWrapper,
  ProtectedPage,
} from '@/modules/account/components/components';

import {ChangePasswordForm} from './components/components';

export function AccountChangePasswordPage() {
  return (
    <ProtectedPage>
      <FormWrapper>
        <ChangePasswordForm />
      </FormWrapper>
    </ProtectedPage>
  );
}
