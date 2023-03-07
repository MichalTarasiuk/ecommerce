export * from './useLockedBody';

import {useEffect, useInsertionEffect} from 'react';

import {resolve} from '~utils/utils';

import {useSyncedRef} from '../state';

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

export const useCSS = (resolvableInnerHTML: () => string | string) => {
  const syncedResolvableInnerHTML = useSyncedRef(resolvableInnerHTML);

  useInsertionEffect(() => {
    const styleElement = document.createElement('style');
    const headElement = document.querySelector('head');

    const resolvedInnerHtml = resolve(syncedResolvableInnerHTML.current);
    styleElement.innerHTML = resolve(resolvedInnerHtml);

    headElement?.appendChild(styleElement);
  }, [syncedResolvableInnerHTML]);
};
