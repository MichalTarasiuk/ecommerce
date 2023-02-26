import {useRouter} from 'next/router';
import * as NProgress from 'nprogress';
import {useCallback, useEffect} from 'react';

import {useCSS} from '@/common/hooks/useCSS';
import {useEvent} from '@/common/hooks/useEvent';

import {getStyles, routeProgressConfig} from './helpers';

import type {TransitionOptions} from '@/common/types/types';

NProgress.configure({showSpinner: routeProgressConfig.showSpinner});

export const useRouteProgress = () => {
  const router = useRouter();
  const getUrl = useEvent(() => router.asPath);

  useCSS(useCallback(() => getStyles(routeProgressConfig), []));

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
