import {useInsertionEffect, useState} from 'react';

import {usePrevious} from '~composables/state';
import {appConfig} from '~constants/appConfig';

export const useLockBodyScroll = (initialLocked = false) => {
  const [locked, setLocked] = useState(initialLocked);

  const savedInitialLocked = usePrevious(
    initialLocked,
    (savedInitialLocked, initialLocked) => savedInitialLocked !== initialLocked,
  );

  const initialLockedIsChanged = savedInitialLocked !== initialLocked;
  const lockedIsUpdated = initialLocked === locked;

  if (initialLockedIsChanged && !lockedIsUpdated) {
    setLocked(initialLocked);
  }

  useInsertionEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';

    const root = document.getElementById(appConfig.root);
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [locked]);
};
