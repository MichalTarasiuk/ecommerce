import {useQuery} from '@tanstack/react-query';

import {request} from '@/app/queryClient/queryClient';
import {cartByTokenQuery} from '@/common/graphql/queries/queries';
import {isClient} from '@/common/utils/utils';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
} from '@/common/types/generated/graphql';

type UseCartByTokenParams = {
  readonly cartToken: string | null;
  readonly enabled: boolean;
};

export const useCartByToken = ({cartToken, enabled}: UseCartByTokenParams) => {
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
