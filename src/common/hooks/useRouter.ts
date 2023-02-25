import {useRouter as useNativeRouter} from 'next/router';
import {useCallback} from 'react';

import {useRegion} from './useRegion';

import type {TransitionOptions, Url} from '@/common/types/types';

export const useRouter = () => {
  const nativeRouter = useNativeRouter();
  const region = useRegion();

  const push = useCallback(
    (pathname: Url, options?: TransitionOptions | undefined) =>
      nativeRouter.push(
        region.pathname + pathname.toString(),
        undefined,
        options,
      ),
    [nativeRouter, region.pathname],
  );

  return {
    ...nativeRouter,
    push,
  };
};
