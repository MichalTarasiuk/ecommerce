import {useQuery} from '@tanstack/react-query';

import {request} from '@/app/queryClient/queryClient';
import {meQuery} from '@/common/graphql/queries/queries';

import type {MeQuery} from '@/common/types/generated/graphql';

export const useMe = () => {
  const {data, isLoading} = useQuery<MeQuery>({
    queryFn: () => request(meQuery),
  });

  const me = data?.me ?? null;

  return {
    me,
    isLoading,
  };
};
