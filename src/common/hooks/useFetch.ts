import deepEqual from 'deep-equal';
import {useQuery} from 'urql';

import {useCustomCompareMemo} from './useCustomCompareMemo';

import type {AnyVariables, UseQueryArgs} from 'urql';

export const useFetch = <
  Data = unknown,
  Variables extends AnyVariables = AnyVariables,
>(
  args: UseQueryArgs<Variables, Data>,
) => {
  const context = useCustomCompareMemo(
    () => args.context ?? {},
    [args.context],
    (savedDeps, deps) => {
      const equals = deepEqual(savedDeps, deps);

      return equals;
    },
  );

  const useQueryResponse = useQuery({...args, context});

  return useQueryResponse;
};
