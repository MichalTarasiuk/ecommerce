import {useRouter} from 'next/router';
import * as NProgress from 'nprogress';
import {useCallback, useEffect} from 'react';

import {useCSS, useEvent} from '@/common/hooks/hooks';

import {canRunRouteProgress, getStyles} from './helpers';

import type {NextRouter as AnyNextRouter} from 'next/router';
import type {Url} from 'url';

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

const config = {
  startPosition: 0.3,
  showSpinner: false,
  color: 'hsl(234, 72%, 63%)' as const,
  height: `3px` as const,
};

export const useRouteProgress = () => {
  const router = useRouter();
  const getUrl = useEvent(() => router.asPath);

  useCSS(useCallback(() => getStyles(config), []));

  useEffect(() => {
    NProgress.configure({showSpinner: config.showSpinner});

    const routeChangeStartHandler = (
      nextUrl: string,
      {shallow}: InferTransitionOptions<typeof router>,
    ) => {
      const url = getUrl();

      if (canRunRouteProgress(url, nextUrl, shallow)) {
        NProgress.set(config.startPosition);
        NProgress.start();
      }
    };
    const routeChangeCompleteHandler = (
      nextUrl: string,
      {shallow}: InferTransitionOptions<typeof router>,
    ) => {
      const url = getUrl();

      if (canRunRouteProgress(url, nextUrl, shallow)) {
        NProgress.done(true);
      }
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeCompleteHandler);
    router.events.on('routeChangeError', routeChangeCompleteHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeCompleteHandler);
      router.events.off('routeChangeError', routeChangeCompleteHandler);
    };
  }, [getUrl, router]);
};
