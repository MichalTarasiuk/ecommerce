import {useEffect, useLayoutEffect, useRef} from 'react';

import {isClient} from '~utils/utils';

export const useLayout = isClient() ? useLayoutEffect : useEffect;

import {useSyncedRef} from './state';

import type {EffectCallback} from 'react';

/**
 * Use with caution.
 */
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

export const useHasMounted = () => {
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;

    return () => {
      hasMounted.current = false;
    };
  }, []);

  return hasMounted;
};
