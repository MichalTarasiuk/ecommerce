import {useRef} from 'react';

import {useLayout} from './useLayout';

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
