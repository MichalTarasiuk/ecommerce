import {useCallback} from 'react';

import {useOnlineNetworkEffect} from '@/app/contexts/networkContext/networkContext';
import {useLocalStorage} from '@/common/hooks/useLocalStorage';

import {isOfflineCart} from './helpers';

import type {OfflineCart} from './helpers';
import type {CartAddProductLineMutationVariables} from '@/common/types/generated/graphql';

export const useOfflineCart = () => {
  const [_offlineCart, setOfflineCart] = useLocalStorage<OfflineCart>(
    'offline-cart',
    (value) => (isOfflineCart(value) ? value : null),
  );

  useOnlineNetworkEffect(() => {});

  const offlineCartAddProductLine = useCallback(
    (
      cartAddProductLineMutationVariables: CartAddProductLineMutationVariables,
    ) => {
      if (isOfflineCart(cartAddProductLineMutationVariables)) {
        const {cartToken, lines} = cartAddProductLineMutationVariables;

        setOfflineCart((offlineCart) => {
          if (offlineCart?.cartToken === cartToken) {
            return {
              ...offlineCart,
              lines: [...offlineCart.lines, ...lines],
            };
          }

          return {
            cartToken,
            lines,
          };
        });
      }
    },
    [setOfflineCart],
  );

  return {
    offlineCartAddProductLine,
  };
};
