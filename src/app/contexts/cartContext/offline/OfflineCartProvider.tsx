import {createSafeContext} from '@/common/utils/utils';

import type {InferProps} from '@/common/types/types';

type OfflineCartProviderProps = ObjectType.Required<
  Omit<InferProps<typeof NativeOfflineCartProvider>, 'value'>,
  'children'
>;

type OfflineCartContextValue = {};

const [NativeOfflineCartProvider, useOfflineCart] =
  createSafeContext<OfflineCartContextValue>('offlineCart');

function OfflineCartProvider({children}: OfflineCartProviderProps) {
  return (
    <NativeOfflineCartProvider value={{}}>{children}</NativeOfflineCartProvider>
  );
}

export {OfflineCartProvider, useOfflineCart};
