import {useRef, useState, useMemo} from 'react';

import {resolve} from '~utils/utils';

import {useLayout} from './lifecycle';

export const usePrevious = <Value>(
  value: Value,
  predicate: (savedValue: Value | undefined, value: Value) => boolean,
) => {
  const ref = useRef<Value | undefined>(undefined);

  useLayout(() => {
    if (!predicate(ref.current, value)) {
      ref.current = value;
    }
  });

  return ref.current;
};

export const useConst = <State>(resolvableState: State | (() => State)) => {
  const [state] = useState(() => {
    const resolvedState = resolve(resolvableState);

    return resolvedState;
  });

  return state;
};

export const useSyncedRef = <Value>(value: Value) => {
  const ref = useRef(value);

  ref.current = value;

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return ref.current;
        },
      }),
    [],
  );
};
