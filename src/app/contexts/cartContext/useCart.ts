import {useCallback} from 'react';

import {useOfflineCart} from './offline/offlineCart';
import {useOnlineCart} from './online/onlineCart';

import type {CartLine} from './types';

export const useCart = () => {
  const {
    onlineCartState,
    onlineCartAddProductLine,
    createOnlineCart,
    resetCartToken,
  } = useOnlineCart();
  const {createOfflineCart, offlineCartAddProductLine} = useOfflineCart();

  const createCart = useCallback(
    async (cartLine: CartLine) => {
      const cartToken = await createOnlineCart(cartLine);

      if (cartToken) {
        createOfflineCart({cartToken, lines: [cartLine]});
      }
    },
    [createOfflineCart, createOnlineCart],
  );

  const cartAddProductLine = useCallback(
    async (cartLine: CartLine) => {
      const cartLinesAdd = await onlineCartAddProductLine(cartLine);

      if (!cartLinesAdd?.errors?.length) {
        offlineCartAddProductLine(cartLine);
      }
    },
    [offlineCartAddProductLine, onlineCartAddProductLine],
  );

  const addToCart = useCallback(
    async (variantId: string) => {
      // eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
      const cartLine: CartLine = {variantId, quantity: 1};

      if (onlineCartState) {
        await cartAddProductLine(cartLine);
      }

      await createCart(cartLine);
    },
    [cartAddProductLine, createCart, onlineCartState],
  );

  return {
    onlineCartState,
    createOnlineCart,
    resetCartToken,
    addToCart,
  };
};
