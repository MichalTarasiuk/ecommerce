import {useInsertionEffect} from 'react';

import {resolve} from '@/common/utils/utils';

export const useCSS = (resolvableInnerHTML: () => string | string) => {
  useInsertionEffect(() => {
    const styleElement = document.createElement('style');
    const headElement = document.querySelector('head');

    styleElement.innerHTML = resolve(resolvableInnerHTML);

    headElement?.appendChild(styleElement);
  }, []);

  return {};
};
