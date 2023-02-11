import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useSyncedRef} from './useSyncedRef';

import type {NextRouter} from 'next/router';
import type {UrlObject} from 'url';

type Url = UrlObject | string;

type TransitionOptions = NextRouter extends {
  readonly push: (
    url: Url,
    as?: Url,
    options?: infer TransitionOptions,
  ) => unknown;
}
  ? TransitionOptions
  : never;

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
