import {CheckoutLayout} from 'layouts/layouts';

import type {ReactElement} from 'react';
import type {NextPageWithLayout} from 'types/next';

export const CheckoutPage: NextPageWithLayout = ({}) => {
  return null;
};

CheckoutPage.getLayout = (page: ReactElement) => (
  <CheckoutLayout>{page}</CheckoutLayout>
);
