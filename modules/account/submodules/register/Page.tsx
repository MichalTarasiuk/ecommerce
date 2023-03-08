import {
  FormWrapper,
  ProtectedPage,
} from 'modules/account/components/components';

import {RegisterForm} from './components/components';

export function AccountRegisterPage() {
  return (
    <ProtectedPage>
      <FormWrapper>
        <RegisterForm />
      </FormWrapper>
    </ProtectedPage>
  );
}
