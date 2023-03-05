import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {useCartState} from '@/app/contexts/contexts';
import {request} from '@/app/queryClient/request/request';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/mutations';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
  CheckoutLineInput,
} from '@/common/types/generated/graphql';

export const useAddToCart = () => {
  const {cartState, createStateCart} = useCartState();

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

      await createStateCart(cartLine);
    },
    [cartAddProductLineMutate, cartState, createStateCart],
  );

  return addToCart;
};
