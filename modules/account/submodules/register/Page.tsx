import {AccountLayout} from 'layouts/layouts';
import {ProtectedPage} from 'modules/account/components/components';

import {RegisterForm} from './components/components';

import type {ReactElement} from 'react';
import type {NextPageWithLayout} from 'types/next';

export const AccountRegisterPage: NextPageWithLayout = () => {
  return (
    <ProtectedPage>
      <RegisterForm />
    </ProtectedPage>
  );
};

AccountRegisterPage.getLayout = (page: ReactElement) => (
  <AccountLayout>{page}</AccountLayout>
);
