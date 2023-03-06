import {routes} from '@/common/consts/routes';
import {createNamespacesProvider} from 'src/modules/core/utils/utils';

export const getStaticProps = createNamespacesProvider(routes.checkout);
