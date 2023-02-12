import {useRouter} from 'next/router';
import {useMemo} from 'react';

import {getChannel, getLocale} from './helpers';

export const useRegion = () => {
  const router = useRouter();

  return useMemo(
    () => ({
      locale: getLocale(router.query),
      channel: getChannel(router.query),
    }),
    [router.query],
  );
};
