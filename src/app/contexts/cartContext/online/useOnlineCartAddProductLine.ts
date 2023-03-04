import {useMutation} from '@tanstack/react-query';
import {useCallback} from 'react';
import {toast} from 'sonner';

import {request} from '@/app/queryClient/queryClient';
import {cartAddProductLineMutation} from '@/common/graphql/mutations/cartAddProductLineMutation';

import type {CartLine} from '../types';
import type {
  CartAddProductLineMutation,
  CartAddProductLineMutationVariables,
} from '@/common/types/generated/graphql';

export const useOnlineCartAddProductLine = (cartToken: string | null) => {
  const {mutateAsync} = useMutation<
    CartAddProductLineMutation,
    unknown,
    CartAddProductLineMutationVariables
  >((variables) => request(cartAddProductLineMutation, variables));

  const onlineCartAddProductLine = useCallback(
    async (cartLine: CartLine) => {
      if (cartToken) {
        const lines = [cartLine];
        const {cartLinesAdd} = await mutateAsync({cartToken, lines});

        cartLinesAdd?.errors.forEach((error) => {
          if (error.message) {
            toast.error(error.message);
          }
        });

        return cartLinesAdd;
      }

      return null;
    },
    [cartToken, mutateAsync],
  );

  return onlineCartAddProductLine;
};
