import {routes} from 'constants/constants';
import {useMeQuery} from 'graphql/generated/graphql';
import {useEffectOnce} from 'lib/lifecycle';
import {useRouter} from 'lib/nextRouter/nextRouter';

import type {ReactNode} from 'react';

type ProtectedPageProps = {
  readonly children: ReactNode;
};

function ProtectedPage({children}: ProtectedPageProps) {
  const meQuery = useMeQuery();
  const router = useRouter();

  useEffectOnce(() => {
    const {data: {me} = {}, isLoading} = meQuery;
    const shouldRedirect = me && !isLoading;

    if (shouldRedirect) {
      void router.push(routes.home);
    }
  });

  return <>{children}</>;
}

export {ProtectedPage};
