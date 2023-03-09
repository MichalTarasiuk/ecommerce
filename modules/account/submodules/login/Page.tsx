import {AccountLayout} from 'layouts/layouts';
import {ProtectedPage} from 'modules/account/components/components';

import {LoginForm} from './components/components';

import type {ReactElement} from 'react';

export function AccountLoginPage() {
  return (
    <ProtectedPage>
      <LoginForm />
    </ProtectedPage>
  );
}

AccountLoginPage.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
);
