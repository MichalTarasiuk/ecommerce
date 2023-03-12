import {useCallback} from 'react';
import {toast} from 'sonner';

import {useCartAddProductLineMutation} from 'graphql/generated/graphql';
import {useCartState} from 'lib/cartState/cartState';

import type {CheckoutLineInput} from 'graphql/generated/graphql';

export const useAddToCart = () => {
  const {cartState, createCartState} = useCartState();

  const cartAddProductLineMutation = useCartAddProductLineMutation();

  const addToCart = useCallback(
    async (variantId: string) => {
      const cartLine: CheckoutLineInput = {variantId, quantity: 1};

      if (cartState) {
        const {cartToken} = cartState;

        const {cartLinesAdd} = await cartAddProductLineMutation.mutateAsync({
          cartToken,
          lines: [cartLine],
        });

        cartLinesAdd?.errors.forEach((error) => {
          if (error.message) {
            toast.error(error.message);
          }
        });

        return;
      }

      await createCartState(cartLine);
    },
    [cartAddProductLineMutation, cartState, createCartState],
  );

  return addToCart;
};
