import {useRouter} from 'next/router';
import queryString from 'query-string';
import {useCallback, useEffect, useState} from 'react';

import type {NextRouter as AnyNextRouter} from 'next/router';
import type {UrlObject} from 'url';

type Url = UrlObject | string;

type InferTransitionOptions<NextRouter extends AnyNextRouter> =
  NextRouter extends {
    readonly push: (
      url: Url,
      as?: Url,
      options?: infer TransitionOptions,
    ) => unknown;
  }
    ? TransitionOptions
    : never;

export const useRefreshProps = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const routeChangeStartHandler = (
      _nextUrl: string,
      transitionOptions: InferTransitionOptions<typeof router>,
    ) => {
      if (transitionOptions.shallow) {
        setIsRefreshing(true);
      }
    };
    const routeChangeFinishHandler = () => {
      setIsRefreshing((currentIsRefreshing) => currentIsRefreshing && false);
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

  const refreshProps = useCallback(
    (searchParams: Record<string, string>) => {
      const url = `${router.asPath}?${queryString.stringify(searchParams)}`;

      void router.replace(url, undefined);
    },
    [router],
  );

  return {isRefreshing, refreshProps};
};
