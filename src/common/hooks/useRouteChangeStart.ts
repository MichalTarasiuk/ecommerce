import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useSyncedRef} from './useSyncedRef';

import type {TransitionOptions} from '@/common/types/types';

type Handler = (nextUrl: string, transitionOptions: TransitionOptions) => void;

export const useRouteChangeStart = (handler: Handler) => {
  const router = useRouter();
  const syncedHandler = useSyncedRef(handler);

  useEffect(() => {
    const currentHandler = syncedHandler.current;

    router.events.on('routeChangeStart', currentHandler);

    return () => {
      router.events.off('routeChangeStart', currentHandler);
    };
  }, [router.events, syncedHandler]);

  return {};
};
