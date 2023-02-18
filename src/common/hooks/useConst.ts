import {useState} from 'react';

import {resolve} from '@/common/utils/utils';

export const useConst = <State>(resolvableState: State | (() => State)) => {
  const [state] = useState(() => {
    const resolvedState = resolve(resolvableState);

    return resolvedState;
  });

  return state;
};
