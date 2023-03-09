import {AccountLayout} from 'layouts/layouts';
import {ProtectedPage} from 'modules/account/components/components';

import {ChangePasswordForm} from './components/components';

import type {ReactElement} from 'react';

export function AccountChangePasswordPage() {
  return (
    <ProtectedPage>
      <ChangePasswordForm />
    </ProtectedPage>
  );
}

AccountChangePasswordPage.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
);
