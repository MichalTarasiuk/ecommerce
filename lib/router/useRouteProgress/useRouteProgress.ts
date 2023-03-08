import {useRouter} from 'next/router';
import * as NProgress from 'nprogress';
import {useEffect} from 'react';

import {useEvent} from 'lib/callback';
import {useCSS} from 'lib/dom/dom';

import {getStyles, routeProgressConfig} from './helpers';

import type {TransitionOptions} from 'types/types';

NProgress.configure({showSpinner: routeProgressConfig.showSpinner});

export const useRouteProgress = () => {
  const router = useRouter();
  const getUrl = useEvent(() => router.asPath);

  useCSS(() => getStyles(routeProgressConfig));

  useEffect(() => {
    const routeChangeStartHandler = (
      nextUrl: string,
      {shallow}: TransitionOptions,
    ) => {
      const url = getUrl();

      if (nextUrl !== url && !shallow) {
        NProgress.set(routeProgressConfig.startPosition);
        NProgress.start();
      }
    };
    const routeChangeCompleteHandler = (
      nextUrl: string,
      {shallow}: TransitionOptions,
    ) => {
      const url = getUrl();

      if (nextUrl === url && !shallow) {
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
