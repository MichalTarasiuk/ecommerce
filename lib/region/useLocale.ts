import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {getChannel, getLocale} from './helpers';

import type {Locale} from 'lib/translate/types';

export const useLocale = () => {
  const router = useRouter();

  const locale = useMemo(() => getLocale(router.query), [router.query]);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      return router.push({
        pathname: router.route,
        query: {
          channel: getChannel(router.query),
          locale: nextLocale,
        },
      });
    },
    [router],
  );

  return {
    locale,
    setLocale,
  };
};
