import {useMutation} from '@tanstack/react-query';
import {useMemo} from 'react';

import {request} from '@/app/queryClient/request/request';
import {createCartMutation} from '@/common/graphql/mutations/createCartMutation';
import {useHasMounted} from '@/common/hooks/useHasMounted';
import {isObject, isString} from '@/common/utils/utils';

import type {
  CreateCartMutation,
  CreateCartMutationVariables,
} from '@/common/types/generated/graphql';

type UseCreateCartMutationParams = {
  readonly cartToken: string | null;
};

export const useCreateCartMutation = ({
  cartToken,
}: UseCreateCartMutationParams) => {
  const {
    data: {cartCreate} = {},
    mutateAsync: createCartMutate,
    reset,
  } = useMutation<CreateCartMutation, unknown, CreateCartMutationVariables>(
    (variables) => request(createCartMutation, variables),
  );

  const {cart} = cartCreate ?? {};
  const cartMutationState = useMemo(
    () =>
      cart?.token && isString(cart.token)
        ? {token: cart.token, id: cart.id}
        : null,
    [cart],
  );

  const hasMounted = useHasMounted();

  if (
    hasMounted &&
    isObject(cartMutationState) &&
    cartToken !== cartMutationState.token
  ) {
    reset();
  }

  return {
    cartMutationState,
    createCartMutate,
  };
};
