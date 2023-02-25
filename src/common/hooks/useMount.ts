import {useEffect, useRef} from 'react';

import {useSyncedRef} from './useSyncedRef';

import type {EffectCallback} from 'react';

/**
 * Use with caution.
 */
export const useMount = (effect: EffectCallback) => {
  const syncedEffect = useSyncedRef(effect);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      syncedEffect.current();
    }
  }, [syncedEffect]);
};
