import {useRouter} from 'next/router';
import {useMemo} from 'react';

import {getRegion, regionToPathname} from './helpers';

export const useRegion = () => {
  const router = useRouter();

  return useMemo(() => {
    const region = getRegion(router.query);
    const pathname = regionToPathname(region);

    const {variables, locale} = region;

    return {
      locale,
      variables,
      pathname,
    };
  }, [router.query]);
};
