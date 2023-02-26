import {useQuery} from '@tanstack/react-query';
import {useCallback, useMemo} from 'react';

import {request} from '@/app/queryClient/queryClient';
import {cartByTokenQuery} from '@/common/graphql/queries/cartByTokenQuery';
import {useLocalStorage} from '@/common/hooks/useLocalStorage';
import {useRegion} from '@/common/hooks/useRegion';
import {createSafeContext, isClient, isString} from '@/common/utils/utils';

import {getCartState} from './helpers';
import {useCreateCartMutation} from './useCreateCartMutation';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
  CreateCartMutationVariables,
} from '@/common/types/generated/graphql';
import type {InferProps} from '@/common/types/types';

type CartProviderProps = ObjectType.Required<
  Omit<InferProps<typeof NativeCartProvider>, 'value'>,
  'children'
>;

type CartContextValue = {
  readonly cartState: ReturnType<typeof getCartState>;
  readonly createCart: (
    createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
  ) => Promise<ReturnType<typeof getCartState>>;
  readonly resetCartToken: FunctionType.Noop;
};

const cartTokenName = 'cartToken';

const [NativeCartProvider, useCart] =
  createSafeContext<CartContextValue>('cart');

function CartProvider({children}: CartProviderProps) {
  const [cartToken, setCartToken] = useLocalStorage(
    cartTokenName,
    (nextCartToken) => (isString(nextCartToken) ? nextCartToken : null),
  );

  const region = useRegion();

  const {cartMutationState, createCartMutate} = useCreateCartMutation({
    cartToken,
  });
  const {data: {cart: fallbackCart} = {}} = useQuery({
    queryFn: () =>
      request<CartByTokenQuery, CartByTokenQueryVariables>(cartByTokenQuery, {
        cartToken,
      }),
    enabled: isClient() && Boolean(cartToken) && !cartMutationState,
  });

  const cartState = useMemo(
    () => cartMutationState ?? getCartState(fallbackCart),
    [fallbackCart, cartMutationState],
  );

  const createCart = useCallback(
    async (
      createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
    ) => {
      const {cart} =
        (
          await createCartMutate({
            ...createCartMutationVariables,
            channel: region.variables.channel,
          })
        ).cartCreate ?? {};

      if (cart?.token && isString(cart.token)) {
        setCartToken(cart.token);
      }

      return getCartState(cart);
    },
    [createCartMutate, region.variables.channel, setCartToken],
  );

  const resetCartToken = useCallback(() => setCartToken(null), [setCartToken]);

  const value = useMemo(
    () => ({
      cartState,
      createCart,
      resetCartToken,
    }),
    [cartState, createCart, resetCartToken],
  );

  return <NativeCartProvider value={value}>{children}</NativeCartProvider>;
}

export {CartProvider, useCart};
