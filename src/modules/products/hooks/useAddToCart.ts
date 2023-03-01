import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {useCart} from '@/app/contexts/contexts';
import {request} from '@/app/queryClient/queryClient';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/cartAddProductLineMutation';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
} from '@/common/types/generated/graphql';

export const useAddToCart = () => {
  const {cartState, createCart} = useCart();

  const {mutateAsync: cartAddProductLineMutate} = useMutation<
    CartAddProductLineMutation,
    unknown,
    CartAddProductLineMutationVariables
  >((variables) => request(cartAddProductLineMutation, variables));

  const addToCart = useCallback(
    async (variantId: string) => {
      if (cartState) {
        const {cartToken} = cartState;

        const {cartLinesAdd} = await cartAddProductLineMutate({
          cartToken,
          variantId,
        });

        cartLinesAdd?.errors.forEach((error) => {
          if (error.message) {
            toast.error(error.message);
          }
        });

        return;
      }

      await createCart({lines: [{quantity: 1, variantId}]});
    },
    [cartState, cartAddProductLineMutate, createCart],
  );

  return addToCart;
};
