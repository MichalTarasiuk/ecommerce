import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {request} from '@/app/queryClient/queryClient';
import {cartByTokenQuery} from '@/common/graphql/queries/queries';
import {isClient} from '@/common/utils/utils';

import {getOnlineCartState} from './helpers';
import {useCreateOnlineCart} from './useCreateOnlineCart';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
} from '@/common/types/generated/graphql';

export const useOnlineCartState = (cartToken: string | null) => {
  const {onlineCartMutationState, createOnlineCartMutate} = useCreateOnlineCart(
    {
      cartToken,
    },
  );
  const {data: {cart: fallbackCart} = {}} = useQuery({
    queryKey: ['cart-by-token'],
    queryFn: () =>
      request<CartByTokenQuery, CartByTokenQueryVariables>(cartByTokenQuery, {
        cartToken,
      }),
    enabled: isClient() && Boolean(cartToken) && !onlineCartMutationState,
  });

  const onlineCartState = useMemo(
    () => onlineCartMutationState ?? getOnlineCartState(fallbackCart),
    [onlineCartMutationState, fallbackCart],
  );

  return {
    onlineCartState,
    createOnlineCartMutate,
  };
};
