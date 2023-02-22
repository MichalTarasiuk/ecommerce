import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {getChannel, getLocale} from '@/common/utils/utils';

import type {Custom} from '@/common/types/types';
import type {i18nConfig} from '@root/i18n';

export const useLocale = () => {
  const router = useRouter();

  const locale = useMemo(() => getLocale(router.query), [router.query]);

  const setLocale = useCallback(
    async (nextLocale: Custom.ValueOf<(typeof i18nConfig)['locales']>) => {
      await router.push({
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
