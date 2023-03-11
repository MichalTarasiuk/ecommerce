import {debounce as debounceImpl} from 'debounce';
import {useMemo, useRef, useState} from 'react';

const valueEquality = <Value>(left: Value, right: Value) => {
  return left === right;
};

export const useDebounce = <State>(state: State, delay: number) => {
  const [debouncedState, setState] = useState(state);
  const savedState = useRef<State>();

  const debounced = useMemo(
    () =>
      debounceImpl((nextState: State) => {
        setState(nextState);
      }, delay),
    [delay],
  );

  if (!valueEquality(savedState.current, state)) {
    debounced(state);

    savedState.current = state;
  }

  return debouncedState;
};
