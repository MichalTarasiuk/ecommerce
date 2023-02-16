import {useRouter} from 'next/router';
import {useMemo} from 'react';

import {getRegion} from '@/common/utils/utils';

export const useRegion = () => {
  const router = useRouter();

  return useMemo(() => getRegion(router.query), [router.query]);
};
