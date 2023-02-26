import {produce} from 'immer';
import {useCallback, useMemo, useRef, useSyncExternalStore} from 'react';

import {createEventHub} from './createEventHub';
import {createSafeContext} from './createSafeContext';
import {isObject} from './typeof';

import type {Custom, FunctionType} from '../types/types';
import type {Draft} from 'immer';
import type {ReactNode} from 'react';

type FastContextProviderProps = {
  readonly children: ReactNode;
};

type CreateFastContext<Store extends Record<PropertyKey, unknown>> = {
  readonly get: () => Store;
  readonly setStore: (
    nextStore: Partial<Store> | ((draft: Draft<Store>) => void),
  ) => void;
  readonly subscribe: (onStoreChange: FunctionType.Unknown) => () => void;
};
type Selector<Store extends Record<PropertyKey, unknown>, Selected> = (
  store: Store,
) => Selected;

const eventHub = createEventHub();

export const createFastContext = <Store extends Record<PropertyKey, unknown>>(
  name: string,
  initialStore: Store,
) => {
  const [NativeFastContextProvider, useNativeFastContext] =
    createSafeContext<CreateFastContext<Store>>(name);

  const FastContextProvider = ({children}: FastContextProviderProps) => {
    const store = useRef(initialStore);

    const get = useCallback(() => store.current, []);

    const subscribe = useCallback((onStoreChange: FunctionType.Unknown) => {
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
      <NativeFastContextProvider value={value}>
        {children}
      </NativeFastContextProvider>
    );
  };

  const useFastContext = <
    Selected,
    SafeSelected = Custom.Equals<Selected, unknown> extends 1
      ? Store
      : Selected,
  >(
    selector?: Selector<Store, Selected>,
  ) => {
    const {get, setStore, subscribe} = useNativeFastContext();

    const getSnapshot = useCallback(
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- hard to infer
      () => (selector ? selector(get()) : get()) as SafeSelected,
      [get, selector],
    );

    const selectedStore = useSyncExternalStore(
      subscribe,
      getSnapshot,
      getSnapshot,
    );

    return [selectedStore, setStore] as const;
  };

  const useSetFastContext = () => {
    const {setStore} = useNativeFastContext();

    return setStore;
  };

  return [FastContextProvider, useFastContext, useSetFastContext] as const;
};
