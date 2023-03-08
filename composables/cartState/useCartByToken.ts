import {useQuery} from '@tanstack/react-query';

import {request} from '~app/queryClient/queryClient';
import {cartByTokenQuery} from '~graphql/queries/queries';
import {isClient} from '~utils/utils';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
} from '~types/generated/graphql';

export const useCartByToken = ({
  cartToken,
  enabled,
}: {
  readonly cartToken: string | null;
  readonly enabled: boolean;
}) => {
  const {data} = useQuery({
    queryKey: ['cart-by-token'],
    queryFn: () =>
      request<CartByTokenQuery, CartByTokenQueryVariables>(cartByTokenQuery, {
        cartToken,
      }),
    staleTime: Infinity,
    enabled: isClient() && enabled,
  });

  return data?.cart;
};
