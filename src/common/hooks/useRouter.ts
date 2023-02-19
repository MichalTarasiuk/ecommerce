import {useRouter as useNativeRouter} from 'next/router';
import {useCallback} from 'react';

import {useRegion} from './useRegion';

import type {TransitionOptions} from '@/common/types/types';

export const useRouter = () => {
  const nativeRouter = useNativeRouter();
  const region = useRegion();

  const push = useCallback(
    async (pathname: `/${string}`, options?: TransitionOptions | undefined) => {
      const resolved = await nativeRouter.push(
        region.pathname + pathname,
        undefined,
        options,
      );

      return resolved;
    },
    [nativeRouter, region.pathname],
  );

  return {
    ...nativeRouter,
    push,
  };
};
