import {produce} from 'immer';
import {useCallback, useMemo, useRef, useSyncExternalStore} from 'react';

import {createEventHub} from './createEventHub';
import {createSafeContext} from './createSafeContext';
import {isObject} from './typeof';

import type {Equals, UnknownFunction} from '../types/types';
import type {Draft} from 'immer';
import type {ReactNode} from 'react';

type FastContextProviderProps<Store extends Record<PropertyKey, unknown>> = {
  readonly store: Store;
  readonly children: ReactNode;
};

type CreateFastContext<Store extends Record<PropertyKey, unknown>> = {
  readonly get: () => Store;
  readonly setStore: (
    nextStore: Partial<Store> | ((draft: Draft<Store>) => void),
  ) => void;
  readonly subscribe: (onStoreChange: UnknownFunction) => () => void;
};
type Selector<Store extends Record<PropertyKey, unknown>, Selected> = (
  store: Store,
) => Selected;

const eventHub = createEventHub();

export const createFastContext = <Store extends Record<PropertyKey, unknown>>(
  name: string,
) => {
  const [FastContextProviderImpl, useFastContextImpl] =
    createSafeContext<CreateFastContext<Store>>(name);

  const FastContextProvider = ({
    children,
    store: initialStore,
  }: FastContextProviderProps<Store>) => {
    const store = useRef(initialStore);

    const get = useCallback(() => store.current, []);

    const subscribe = useCallback((onStoreChange: UnknownFunction) => {
      const subscriber = eventHub.on(name, onStoreChange);

      return () => {
        subscriber.off();
      };
    }, []);

    const setStore = useCallback(
      (nextStore: Partial<Store> | ((draft: Draft<Store>) => void)) => {
        const resolvedStore = isObject(nextStore)
          ? nextStore
          : produce(store.current, nextStore);

        store.current = {
          ...store.current,
          ...resolvedStore,
        };

        eventHub.emit(name);
      },
      [],
    );

    const value = useMemo(
      () => ({get, setStore, subscribe}),
      [get, setStore, subscribe],
    );

    return (
      <FastContextProviderImpl value={value}>
        {children}
      </FastContextProviderImpl>
    );
  };

  const useFastContext = <
    Selected,
    SafeSelected = Equals<Selected, unknown> extends 1 ? Store : Selected,
  >(
    selector?: Selector<Store, Selected>,
  ) => {
    const {get, setStore, subscribe} = useFastContextImpl();

    const selectedStore = useSyncExternalStore(
      subscribe,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- hard to infer
      () => (selector ? selector(get()) : get()) as SafeSelected,
    );

    return [selectedStore, setStore] as const;
  };

  return [FastContextProvider, useFastContext] as const;
};
