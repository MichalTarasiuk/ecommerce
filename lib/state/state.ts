import {useRef, useState} from 'react';

import {useLayout} from 'lib/lifecycle';
import {resolve} from 'utils/utils';

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
