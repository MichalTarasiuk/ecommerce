import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {getChannel, getLocale} from './helpers';

import type {i18nConfig} from '~config/i18n';

type Locale = Custom.ValueOf<(typeof i18nConfig)['locales']>;

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
