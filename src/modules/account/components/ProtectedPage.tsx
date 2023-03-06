import {routes} from '@/common/consts/routes';
import {useMe, useMount, useRouter} from '@/common/hooks/hooks';

import type {ReactNode} from 'react';

type ProtectedPageProps = {
  readonly children: ReactNode;
};

function ProtectedPage({children}: ProtectedPageProps) {
  const {me, isLoading} = useMe();
  const router = useRouter();

  useMount(() => {
    const shouldRedirect = me && !isLoading;

    if (shouldRedirect) {
      void router.push(routes.home);
    }
  });

  return <>{children}</>;
}

export {ProtectedPage};
