import {routes} from 'constants/constants';
import {useMe} from 'lib/generated/generated';
import {useEffectOnce} from 'lib/lifecycle';
import {useRouter} from 'lib/nextRouter/nextRouter';

import type {ReactNode} from 'react';

type ProtectedPageProps = {
  readonly children: ReactNode;
};

function ProtectedPage({children}: ProtectedPageProps) {
  const {me, isLoading} = useMe();
  const router = useRouter();

  useEffectOnce(() => {
    const shouldRedirect = me && !isLoading;

    if (shouldRedirect) {
      void router.push(routes.home);
    }
  });

  return <>{children}</>;
}

export {ProtectedPage};
