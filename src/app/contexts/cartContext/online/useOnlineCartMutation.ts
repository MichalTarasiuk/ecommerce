import {useMutation} from '@tanstack/react-query';
import {useMemo} from 'react';

import {request} from '@/app/queryClient/request/request';
import {createCartMutation} from '@/common/graphql/mutations/createCartMutation';
import {useHasMounted} from '@/common/hooks/useHasMounted';
import {isObject} from '@/common/utils/utils';

import {getOnlineCartState} from './helpers';

import type {
  CreateCartMutation,
  CreateCartMutationVariables,
} from '@/common/types/generated/graphql';

type UseOnlineCartMutationParams = {
  readonly cartToken: string | null;
};

export const useOnlineCartMutation = ({
  cartToken,
}: UseOnlineCartMutationParams) => {
  const {
    data: {cartCreate} = {},
    mutateAsync: createOnlineCartMutate,
    reset,
  } = useMutation<CreateCartMutation, unknown, CreateCartMutationVariables>(
    (variables) => request(createCartMutation, variables),
  );

  const onlineCartMutationState = useMemo(() => {
    const {cart} = cartCreate ?? {};

    return getOnlineCartState(cart);
  }, [cartCreate]);

  const hasMounted = useHasMounted();

  if (
    hasMounted &&
    isObject(onlineCartMutationState) &&
    cartToken !== onlineCartMutationState.cartToken
  ) {
    reset();
  }

  return {
    onlineCartMutationState,
    createOnlineCartMutate,
  };
};
