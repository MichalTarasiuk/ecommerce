import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {useCart} from '@/app/contexts/contexts';
import {request} from '@/app/queryClient/queryClient';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/cartAddProductLineMutation';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
  CheckoutLineInput,
} from '@/common/types/generated/graphql';

export const useAddToCart = () => {
  const {onlineCartState, createOnlineCart} = useCart();

  const {mutateAsync: cartAddProductLineMutate} = useMutation<
    CartAddProductLineMutation,
    unknown,
    CartAddProductLineMutationVariables
  >((variables) => request(cartAddProductLineMutation, variables));

  const addToCart = useCallback(
    async (variantId: string) => {
      // eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
      const lines: Array<CheckoutLineInput> = [{variantId, quantity: 1}];

      if (onlineCartState) {
        const {cartToken} = onlineCartState;

        const {cartLinesAdd} = await cartAddProductLineMutate({
          cartToken,
          lines,
        });

        cartLinesAdd?.errors.forEach((error) => {
          if (error.message) {
            toast.error(error.message);
          }
        });
      }

      await createOnlineCart({lines});
    },
    [onlineCartState, createOnlineCart, cartAddProductLineMutate],
  );

  return addToCart;
};
