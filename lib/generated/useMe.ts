import {useQuery} from '@tanstack/react-query';

import {request} from 'app/queryClient/queryClient';
import {meQuery} from 'graphql/queries/queries';

import type {MeQuery} from 'types/generated/graphql';

export const useMe = () => {
  const {data, isLoading} = useQuery<MeQuery>({
    queryKey: ['me'],
    queryFn: () => request(meQuery),
  });

  const me = data?.me ?? null;

  return {
    me,
    isLoading,
  };
};
