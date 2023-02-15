import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';

import {getChannel, getLocaleName} from './helpers';

import type {Custom} from '@/common/types/types';
import type {i18nConfig} from '@root/i18n';

export const useLocale = () => {
  const router = useRouter();

  const locale = useMemo(() => getLocaleName(router.query), [router.query]);

  const setLocale = useCallback(
    async (nextLocale: Custom.ValueOf<(typeof i18nConfig)['locales']>) => {
      await router.push({
        pathname: '/[channel]/[locale]',
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
