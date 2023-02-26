import {useEffect} from 'react';

import {useSyncedRef} from './useSyncedRef';

import type {MutableRefObject, RefObject} from 'react';

export const useClickOutside = <RefValue extends HTMLElement>(
  ref: RefObject<RefValue> | MutableRefObject<RefValue>,
  fn: FunctionType.Any,
) => {
  const syncedFn = useSyncedRef(fn);

  useEffect(() => {
    const listener = ({target}: MouseEvent | TouchEvent) => {
      if (target instanceof HTMLElement && !ref.current?.contains(target)) {
        syncedFn.current();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, syncedFn]);
};
