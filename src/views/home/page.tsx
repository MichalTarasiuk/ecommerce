import {useQuery} from 'urql';

import {Heading} from '@/common/components';
import FETCH_PRODUCTS_LIST from '@/common/graphql/queries/fetchProductsList.graphql';
import {useTranslate} from '@/common/hooks';

import type {getStaticProps} from './propsProvider';
import type {
  FetchProductsListQuery,
  FetchProductsListQueryVariables,
} from '@/common/graphql/generated/graphql';
import type {InferGetStaticPropsType} from 'next';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export const HomePage = ({}: HomePageProps) => {
  const [queryState] = useQuery<
    FetchProductsListQuery,
    FetchProductsListQueryVariables
  >({
    query: FETCH_PRODUCTS_LIST,
  });

  const {translate} = useTranslate('common');

  return (
    <main>
      <Heading tag='h1' size='large'>
        {translate('title')}
      </Heading>
      <ul>
        {queryState.data?.products?.edges.map(({node: {name}}) => (
          <li key={name}>name: {name}</li>
        ))}
      </ul>
    </main>
  );
};
