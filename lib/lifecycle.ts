import {useEffect, useLayoutEffect, useRef} from 'react';

import {isClient} from 'utils/utils';

export const useLayout = isClient() ? useLayoutEffect : useEffect;

import {useSyncedRef} from './state/useSyncedRef';

import type {EffectCallback} from 'react';

export const useEffectOnce = (effect: EffectCallback) => {
  const syncedEffect = useSyncedRef(effect);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      syncedEffect.current();
    }
  }, [syncedEffect]);
};
