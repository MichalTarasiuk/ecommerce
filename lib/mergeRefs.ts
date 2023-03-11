import {isFunction, isObject, hasOwn} from 'utils/utils';

import type {MutableRefObject, LegacyRef, RefCallback} from 'react';

const isRefCallback = <Current>(
  value: unknown,
): value is RefCallback<Current> => isFunction(value);

const isMutableRefObject = <Current>(
  value: unknown,
): value is MutableRefObject<Current> =>
  isObject(value) && hasOwn(value, 'current');

export const mergeRefs = <Element extends HTMLElement = HTMLElement>(
  ...refs: ReadonlyArray<LegacyRef<Element> | MutableRefObject<Element>>
): RefCallback<Element> => {
  return (current) => {
    refs.forEach((ref) => {
      if (isRefCallback<Element>(ref)) {
        ref(current);

        return;
      }

      if (isMutableRefObject<Element | null>(ref)) {
        ref.current = current;
      }
    });
  };
};
