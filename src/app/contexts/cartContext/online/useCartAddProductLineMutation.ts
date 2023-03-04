import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {request} from '@/app/queryClient/queryClient';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/cartAddProductLineMutation';

import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
} from '@/common/types/generated/graphql';

export const useCartAddProductLineMutation = () => {
  const {mutateAsync} = useMutation<
    CartAddProductLineMutation,
    unknown,
    CartAddProductLineMutationVariables
  >((variables) => request(cartAddProductLineMutation, variables));

  return useCallback(
    async (
      cartAddProductLineMutationVariables: CartAddProductLineMutationVariables,
    ) => {
      const {cartLinesAdd} = await mutateAsync(
        cartAddProductLineMutationVariables,
      );

      cartLinesAdd?.errors.forEach((error) => {
        if (error.message) {
          toast.error(error.message);
        }
      });

      return cartLinesAdd;
    },
    [mutateAsync],
  );
};
