import {OnlineCartProvider} from './online/onlineCart';

import type {ReactNode} from 'react';

type CartProviderProps = {
  readonly children: ReactNode;
};

export function CartProvider({children}: CartProviderProps) {
  return <OnlineCartProvider>{children}</OnlineCartProvider>;
}
