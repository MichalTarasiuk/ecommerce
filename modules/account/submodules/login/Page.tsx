import {
  FormWrapper,
  ProtectedPage,
} from '~modules/account/components/components';

import {LoginForm} from './components/components';

export function AccountLoginPage() {
  return (
    <ProtectedPage>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </ProtectedPage>
  );
}
