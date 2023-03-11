import {isFunction, isObject, hasOwn} from 'utils/utils';

import type {MutableRefObject, LegacyRef, RefCallback} from 'react';

const isRefCallback = <Current>(
  value: unknown,
): value is RefCallback<Current> => isFunction(value);

const isMutableRefObject = <Current>(
  value: unknown,
): value is MutableRefObject<Current> =>
  isObject(value) && hasOwn(value, 'current');

export const mergeRefs = <Current>(
  ...refs: ReadonlyArray<LegacyRef<Current> | MutableRefObject<Current>>
): RefCallback<Current> => {
  return (current) => {
    refs.forEach((ref) => {
      if (isRefCallback<Current>(ref)) {
        ref(current);

        return;
      }

      if (isMutableRefObject<Current | null>(ref)) {
        ref.current = current;
      }
    });
  };
};
