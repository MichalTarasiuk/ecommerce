import {useRouter as useNativeRouter} from 'next/router';
import {useCallback, useEffect, useState} from 'react';

import {useRegion} from '../region/region';
import {useSyncedRef} from '../state';

import type {TransitionOptions, Url} from 'types/types';

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

export const useRouteIsChanging = () => {
  const router = useRouter();
  const [routeIsChanging, setRouteIsChanging] = useState(false);

  useEffect(() => {
    const routeChangeStartHandler = () => {
      setRouteIsChanging(true);
    };
    const routeChangeFinishHandler = () => {
      setRouteIsChanging(false);
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeError', routeChangeFinishHandler);
    router.events.on('routeChangeComplete', routeChangeFinishHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeError', routeChangeFinishHandler);
      router.events.off('routeChangeComplete', routeChangeFinishHandler);
    };
  }, [router.events]);

  return routeIsChanging;
};

type RouteChangeStartHandler = (
  nextUrl: string,
  transitionOptions: TransitionOptions,
) => void;

export const useRouteChangeStart = (handler: RouteChangeStartHandler) => {
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
