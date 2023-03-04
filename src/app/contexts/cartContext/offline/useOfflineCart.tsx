import {useCallback} from 'react';

import {useOnlineNetworkEffect} from '@/app/contexts/networkContext/networkContext';
import {useLocalStorage} from '@/common/hooks/useLocalStorage';

import {isCart} from '../helpers';

import type {Cart, CartLine} from '../types';

export const useOfflineCart = () => {
  const [_offlineCart, setOfflineCart] = useLocalStorage<Cart>(
    'offline-cart',
    (value) => (isCart(value) ? value : null),
  );

  useOnlineNetworkEffect(() => {});

  const createOfflineCart = useCallback(
    (nextCart: Cart) => {
      setOfflineCart(nextCart);
    },
    [setOfflineCart],
  );

  const offlineCartAddProductLine = useCallback(
    (cartLine: CartLine) => {
      setOfflineCart((offlineCart) => {
        if (offlineCart) {
          return {
            ...offlineCart,
            lines: [...offlineCart.lines, cartLine],
          };
        }

        return offlineCart;
      });
    },
    [setOfflineCart],
  );

  return {
    createOfflineCart,
    offlineCartAddProductLine,
  };
};
