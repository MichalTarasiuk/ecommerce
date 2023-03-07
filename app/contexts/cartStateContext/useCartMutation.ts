import {useMutation} from '@tanstack/react-query';
import {useMemo} from 'react';

import {request} from '~app/queryClient/request/request';
import {createCartMutation} from '~graphql/mutations/createCartMutation';

import {getCartState} from './helpers';

import type {
  CreateCartMutation,
  CreateCartMutationVariables,
} from '~types/generated/graphql';

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
