import {useCallback} from 'react';

import {useOfflineCart} from './offline/offlineCart';
import {
  useCartAddProductLineMutation,
  useOnlineCart,
} from './online/onlineCart';

import type {
  CartAddProductLineMutationVariables,
  CheckoutLineInput,
} from '@/common/types/generated/graphql';

export const useCart = () => {
  const {onlineCartState, createOnlineCart, resetCartToken} = useOnlineCart();
  const cartAddProductLineMutation = useCartAddProductLineMutation();

  const {offlineCartAddProductLine} = useOfflineCart();

  const cartAddProductLine = useCallback(
    async (
      cartAddProductLineMutationVariables: CartAddProductLineMutationVariables,
    ) => {
      const cartLinesAdd = await cartAddProductLineMutation(
        cartAddProductLineMutationVariables,
      );

      if (!cartLinesAdd?.errors?.length) {
        offlineCartAddProductLine(cartAddProductLineMutationVariables);
      }
    },
    [cartAddProductLineMutation, offlineCartAddProductLine],
  );

  const addToCart = useCallback(
    async (variantId: string) => {
      // eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
      const lines: Array<CheckoutLineInput> = [{variantId, quantity: 1}];

      if (onlineCartState) {
        const {cartToken} = onlineCartState;

        await cartAddProductLine({
          cartToken,
          lines,
        });
      }

      await createOnlineCart({lines});
    },
    [cartAddProductLine, createOnlineCart, onlineCartState],
  );

  return {
    onlineCartState,
    createOnlineCart,
    resetCartToken,
    addToCart,
  };
};
