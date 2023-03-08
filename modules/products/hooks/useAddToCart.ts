import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {request} from 'app/queryClient/queryClient';
import {cartAddProductLineMutation} from 'graphql/mutations/mutations';
import {useCartState} from 'lib/cartState/cartContext';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
  CheckoutLineInput,
} from 'types/generated/graphql';

export const useAddToCart = () => {
  const {cartState, createCartState} = useCartState();

  const {mutateAsync: cartAddProductLineMutate} = useMutation<
    CartAddProductLineMutation,
    unknown,
    CartAddProductLineMutationVariables
  >((variables) => request(cartAddProductLineMutation, variables));

  const addToCart = useCallback(
    async (variantId: string) => {
      const cartLine: CheckoutLineInput = {variantId, quantity: 1};

      if (cartState) {
        const {cartToken} = cartState;

        const {cartLinesAdd} = await cartAddProductLineMutate({
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
    [cartAddProductLineMutate, cartState, createCartState],
  );

  return addToCart;
};
