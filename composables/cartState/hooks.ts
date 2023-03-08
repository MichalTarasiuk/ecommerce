import {useMutation, useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {request} from '~app/queryClient/queryClient';
import {createCartMutation} from '~graphql/mutations/mutations';
import {cartByTokenQuery} from '~graphql/queries/queries';
import {isClient} from '~utils/utils';

import {getCartState} from './helpers';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
  CreateCartMutation,
  CreateCartMutationVariables,
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

export const useCartMutation = () => {
  const {data: {cartCreate} = {}, mutateAsync: createCartMutate} = useMutation<
    CreateCartMutation,
    unknown,
    CreateCartMutationVariables
  >((variables) => request(createCartMutation, variables));

  const cartMutationState = useMemo(() => {
    const {cart} = cartCreate ?? {};

    return getCartState(cart);
  }, [cartCreate]);

  return {
    cartMutationState,
    createCartMutate,
  };
};
