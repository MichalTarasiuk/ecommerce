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
    data: {checkoutCreate} = {},
    mutateAsync: createCartMutate,
    reset,
  } = useMutation<CreateCartMutation, unknown, CreateCartMutationVariables>(
    (variables) => request(createCartMutation, variables),
  );

  const hasMounted = useHasMounted();

  const {checkout} = checkoutCreate ?? {};
  const cartState = useMemo(
    () =>
      checkout?.token && isString(checkout.token)
        ? {token: checkout.token, id: checkout.id}
        : null,
    [checkout],
  );

  if (hasMounted && isObject(cartState) && cartToken !== cartState.token) {
    reset();
  }

  return {
    cartState,
    createCartMutate,
  };
};
