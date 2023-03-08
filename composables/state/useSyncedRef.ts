import {useMemo, useRef} from 'react';

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
