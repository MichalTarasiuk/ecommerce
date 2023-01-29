import {GraphqlClientProvider} from './queryClient/graphqlClient';

import type {ReactNode} from 'react';

type AppProvidersProps = {
  readonly children: ReactNode;
};

export const AppProviders = ({children}: AppProvidersProps) => {
  return <GraphqlClientProvider>{children}</GraphqlClientProvider>;
};
