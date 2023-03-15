import {AccountLayout} from 'layouts/layouts';
import {ProtectedPage} from 'modules/account/components/components';

import {ForgotPasswordForm} from './components/ForgotPasswordForm/ForgotPasswordForm';

import type {ReactElement} from 'react';
import type {NextPageWithLayout} from 'types/next';

export const AccountForgotPasswordPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <ForgotPasswordForm />
    </ProtectedPage>
  );
};

AccountForgotPasswordPage.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
);
