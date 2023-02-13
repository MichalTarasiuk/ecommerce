import {useRouter} from 'next/router';
import * as NProgress from 'nprogress';
import {useCallback, useEffect} from 'react';

import {useCSS, useEvent} from '@/common/hooks/hooks';

import {config} from './consts';
import {canRunRouteProgress, getStyles} from './helpers';

import type {TransitionOptions} from '@/common/types/types';

NProgress.configure({showSpinner: config.showSpinner});

export const useRouteProgress = () => {
  const router = useRouter();
  const getUrl = useEvent(() => router.asPath);

  useCSS(useCallback(() => getStyles(config), []));

  useEffect(() => {
    const routeChangeStartHandler = (
      nextUrl: string,
      {shallow}: TransitionOptions,
    ) => {
      const url = getUrl();

      if (canRunRouteProgress(url, nextUrl, shallow)) {
        NProgress.set(config.startPosition);
        NProgress.start();
      }
    };
    const routeChangeCompleteHandler = (
      nextUrl: string,
      {shallow}: TransitionOptions,
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
