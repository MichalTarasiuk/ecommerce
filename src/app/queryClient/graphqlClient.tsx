import {ReactNode} from 'react';
import {Provider, createClient} from 'urql';
import {graphqlUrl as url} from './consts';

type GraphqlClientProviderProps = {
  readonly children: ReactNode;
};

const client = createClient({
  url,
});

export const GraphqlClientProvider = (props: GraphqlClientProviderProps) => {
  return <Provider value={client}>{props.children}</Provider>;
};
