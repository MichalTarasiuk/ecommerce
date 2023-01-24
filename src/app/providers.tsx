import {ReactNode} from 'react';
import {GraphqlClientProvider} from './queryClient/graphqlClient';

type AppProvidersProps = {
  readonly children: ReactNode;
};

export const AppProviders = ({children}: AppProvidersProps) => {
  return <GraphqlClientProvider>{children}</GraphqlClientProvider>;
};
