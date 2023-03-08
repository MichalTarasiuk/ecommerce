import {useCallback, useRef} from 'react';

import {useLayout} from './lifecycle';

export const useEvent = <Fn extends FunctionType.Any>(fn: Fn) => {
  const savedFn = useRef(fn);

  useLayout(() => {
    savedFn.current = fn;
  });

  return useCallback((...params: Parameters<typeof fn>) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- narrow type down
    return savedFn.current(...params) as ReturnType<Fn>;
  }, []);
};
