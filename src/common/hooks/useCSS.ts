import {useInsertionEffect} from 'react';

import {resolve} from '@/common/utils/utils';

import {useSyncedRef} from './useSyncedRef';

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
