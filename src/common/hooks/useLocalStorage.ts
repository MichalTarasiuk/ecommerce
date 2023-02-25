import {useCallback, useEffect, useState} from 'react';

import {isClient, parseJSON, resolve, toJSON} from '@/common/utils/utils';

import {useSyncedRef} from './useSyncedRef';

import type {Resolvable} from '@/common/utils/utils';

export const useLocalStorage = <Item>(
  key: string,
  predicate: (nextItem: unknown) => Item | null,
) => {
  const [item, setItemState] = useState<Item | null>(() => {
    if (isClient()) {
      const parsedNextItem = parseJSON(localStorage.getItem(key));
      const provenItem = syncedPredicate.current(parsedNextItem);

      return provenItem;
    }

    return null;
  });
  const syncedPredicate = useSyncedRef(predicate);

  useEffect(() => {
    const storageHandler = (storageEvent: StorageEvent) => {
      if (storageEvent.key !== key) {
        return;
      }

      const parsedNextItem = parseJSON(storageEvent.newValue);
      const provenItem = syncedPredicate.current(parsedNextItem);

      setItemState(provenItem);
    };

    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('storage', storageHandler);
    };
  }, [key, syncedPredicate]);

  const setItem = useCallback(
    (resolvableItem: Resolvable<Item>) => {
      const nextItem = resolve(resolvableItem);
      const stringifyNextItem = toJSON(nextItem);

      if (stringifyNextItem) {
        localStorage.setItem(key, stringifyNextItem);

        setItemState(nextItem);

        return;
      }

      console.error(`could not save ${key} to localStorage`);
    },
    [key],
  );

  return [item, setItem] as const;
};
