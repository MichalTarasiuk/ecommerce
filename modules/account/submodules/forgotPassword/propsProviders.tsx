import {routes} from '~constants/constants';
import {createNamespacesProvider} from '~modules/core/utils/utils';

export const getStaticProps = createNamespacesProvider(
  routes.account.forgotPassword,
);
