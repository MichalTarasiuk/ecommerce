import {useEffect} from 'react';

import {useSyncedRef} from './useSyncedRef';

export const useResize = (
  onResize: (this: Window, uiEvent: UIEvent) => void,
) => {
  const syncedOnResize = useSyncedRef(onResize);

  useEffect(() => {
    function listener(this: Window, event: UIEvent) {
      syncedOnResize.current.call(this, event);
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [syncedOnResize]);
};
