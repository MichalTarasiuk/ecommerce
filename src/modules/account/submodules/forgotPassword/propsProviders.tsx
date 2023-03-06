import {routes} from '@/common/consts/routes';
import {createNamespacesProvider} from '@/modules/core/utils/createNamespacesProvider';

export const getStaticProps = createNamespacesProvider(
  routes.account.forgotPassword,
);
