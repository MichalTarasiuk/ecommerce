import {useMemo, useRef} from 'react';

import type {DependencyList} from 'react';

export const useCustomCompareMemo = <Memo, Deps extends DependencyList>(
  factory: () => Memo,
  deps: Deps,
  comparator: (savedDeps: Deps, deps: Deps) => boolean,
) => {
  const dependencies = useRef<Deps>();

  if (
    dependencies.current === undefined ||
    !comparator(dependencies.current, deps)
  ) {
    dependencies.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps -- frostbite when `comparator` function return false
  return useMemo(factory, dependencies.current);
};
