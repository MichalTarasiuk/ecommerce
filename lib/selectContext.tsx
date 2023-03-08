import {produce} from 'immer';
import {useCallback, useMemo, useRef, useSyncExternalStore} from 'react';

import {isObject, createEventHub} from 'utils/utils';

import {createSafeContext} from './safeContext';

import type {Draft} from 'immer';
import type {ReactNode} from 'react';

type SelectContextProviderProps = {
  readonly children: ReactNode;
};

type CreateSelectContext<Store extends Record<PropertyKey, unknown>> = {
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

export const createSelectContext = <Store extends Record<PropertyKey, unknown>>(
  name: string,
  initialStore: Store,
) => {
  const [NativeSelectContextProvider, useNativeSelectContext] =
    createSafeContext<CreateSelectContext<Store>>(name);

  function SelectContextProvider({children}: SelectContextProviderProps) {
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
      <NativeSelectContextProvider value={value}>
        {children}
      </NativeSelectContextProvider>
    );
  }

  const useSelectContext = <
    Selected,
    SafeSelected = Custom.Equals<Selected, unknown> extends 1
      ? Store
      : Selected,
  >(
    selector?: Selector<Store, Selected>,
  ) => {
    const {get, setStore, subscribe} = useNativeSelectContext();

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

  const useSetSelectContext = () => {
    const {setStore} = useNativeSelectContext();

    return setStore;
  };

  return [
    SelectContextProvider,
    useSelectContext,
    useSetSelectContext,
  ] as const;
};
