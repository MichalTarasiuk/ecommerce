import {useCallback, useEffect, useState} from 'react';

import {useSyncedRef} from '~composables/state/state';
import {isClient, parseJSON, resolve, toJSON} from '~utils/utils';

import type {Resolvable} from '~utils/utils';

export const useLocalStorage = <Item>(
  key: string,
  predicate: (nextItem: unknown) => Item | null,
) => {
  const syncedPredicate = useSyncedRef(predicate);
  const [item, setItemState] = useState<Item | null>(() => {
    if (isClient()) {
      const parsedNextItem = parseJSON(localStorage.getItem(key));
      const provenItem = syncedPredicate.current(parsedNextItem);

      return provenItem;
    }

    return null;
  });

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
    (resolvableItem: Resolvable<Item | null, readonly [Item | null]>) => {
      setItemState((item) => {
        const nextItem = resolve(resolvableItem, item);
        const stringifyNextItem = toJSON(nextItem);

        if (stringifyNextItem) {
          localStorage.setItem(key, stringifyNextItem);

          return nextItem;
        }

        console.error(`could not save ${key} to localStorage`);

        return item;
      });
    },
    [key],
  );

  return [item, setItem] as const;
};
