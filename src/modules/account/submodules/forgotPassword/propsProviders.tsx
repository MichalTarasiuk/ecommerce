import {routes} from '@/common/consts/routes';
import {createNamespacesProvider} from '@/modules/core/utils/utils';

export const getStaticProps = createNamespacesProvider(
  routes.account.forgotPassword,
);
