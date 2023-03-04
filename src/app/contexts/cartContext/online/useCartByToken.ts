import {useQuery} from '@tanstack/react-query';

import {request} from '@/app/queryClient/queryClient';
import {cartByTokenQuery} from '@/common/graphql/queries/queries';
import {isClient} from '@/common/utils/utils';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
} from '@/common/types/generated/graphql';

export const useCartByToken = (cartToken: string | null, enabled: boolean) => {
  const {data: {cart} = {}} = useQuery({
    queryKey: ['cart-by-token'],
    queryFn: () =>
      request<CartByTokenQuery, CartByTokenQueryVariables>(cartByTokenQuery, {
        cartToken,
      }),
    enabled: isClient() && enabled,
  });

  return cart;
};
