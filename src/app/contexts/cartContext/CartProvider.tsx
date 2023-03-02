import {OfflineCartProvider} from './offline/offlineCartContext';
import {OnlineCartProvider} from './online/onlineCartContext';

import type {ReactNode} from 'react';

type CartProviderProps = {
  readonly children: ReactNode;
};

export function CartProvider({children}: CartProviderProps) {
  return (
    <OnlineCartProvider>
      <OfflineCartProvider>{children}</OfflineCartProvider>
    </OnlineCartProvider>
  );
}
