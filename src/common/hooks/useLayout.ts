import {useEffect, useLayoutEffect} from 'react';

import {isClient} from '@/common/utils/utils';

export const useLayout = isClient() ? useLayoutEffect : useEffect;
