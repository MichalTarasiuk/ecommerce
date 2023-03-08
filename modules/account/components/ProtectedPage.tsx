import {useMe} from '~composables/graphql/generated';
import {useEffectOnce} from '~composables/lifecycle';
import {useRouter} from '~composables/router/router';
import {routes} from '~constants/constants';

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
