import {useRouter} from 'next/router';
import {useMemo} from 'react';

import {getRegion, regionToPathname} from '@/common/utils/utils';

export const useRegion = () => {
  const router = useRouter();

  return useMemo(() => {
    const region = getRegion(router.query);

    return {
      variables: region,
      pathname: regionToPathname(region),
    };
  }, [router.query]);
};
