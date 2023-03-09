import {AccountLayout} from 'layouts/layouts';
import {ProtectedPage} from 'modules/account/components/components';

import {RegisterForm} from './components/components';

import type {ReactElement} from 'react';

export function AccountRegisterPage() {
  return (
    <ProtectedPage>
      <RegisterForm />
    </ProtectedPage>
  );
}

AccountRegisterPage.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
);
