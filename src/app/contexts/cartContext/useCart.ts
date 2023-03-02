import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {request} from '@/app/queryClient/queryClient';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/mutations';

import {useOnlineCart} from './online/onlineCartContext';
import {useOfflineCart} from './useOfflineCart';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
  CheckoutLineInput,
} from '@/common/types/generated/graphql';

export const useCart = () => {
  const {onlineCartState, createOnlineCart, resetCartToken} = useOnlineCart();
  const {} = useOfflineCart();

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
    [cartAddProductLineMutate, createOnlineCart, onlineCartState],
  );

  return {
    onlineCartState,
    createOnlineCart,
    resetCartToken,
    addToCart,
  };
};
