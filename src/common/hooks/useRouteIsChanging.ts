import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

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
