import {useCallback, useMemo} from 'react';

import {
  useCartByTokenQuery,
  useCreateCartMutation,
} from 'graphql/generated/graphql';
import {useRegion} from 'lib/region/useRegion';
import {createSafeContext} from 'lib/safeContext';
import {useLocalStorage} from 'lib/sideEffect/sideEffect';
import {isString} from 'utils/utils';

import {getCartState} from './helpers';

import type {CartLine, CartState} from './types';
import type {ReactNode} from 'react';

type CartStateProviderProps = {
  readonly children: ReactNode;
};

type CartStateContextValue = {
  readonly cartState: CartState;
  readonly createCartState: (cartLine: CartLine) => Promise<void>;
  readonly resetCartState: FunctionType.Noop;
};

const cartTokenName = 'cartToken';

const [NativeCartStateProvider, useCartState] =
  createSafeContext<CartStateContextValue>('cartState');

function CartStateProvider({children}: CartStateProviderProps) {
  const [cartToken, setCartToken] = useLocalStorage(
    cartTokenName,
    (nextCartToken) => (isString(nextCartToken) ? nextCartToken : null),
  );

  const region = useRegion();

  const createCartMutation = useCreateCartMutation();
  const cartByTokenQuery = useCartByTokenQuery(
    {cartToken},
    {
      staleTime: Infinity,
      enabled: Boolean(cartToken) && createCartMutation.status === 'idle',
    },
  );

  const cartState = useMemo(() => {
    const cart =
      createCartMutation.data?.cartCreate?.cart ?? cartByTokenQuery.data?.cart;

    return getCartState(cart);
  }, [cartByTokenQuery.data?.cart, createCartMutation.data?.cartCreate?.cart]);

  const createCartState = useCallback(
    async (cartLine: CartLine) => {
      const lines = [cartLine];

      const {cart} =
        (
          await createCartMutation.mutateAsync({
            lines,
            channel: region.variables.channel,
          })
        ).cartCreate ?? {};

      if (cart?.token && isString(cart.token)) {
        setCartToken(cart.token);
      }
    },
    [createCartMutation, region.variables.channel, setCartToken],
  );

  const resetCartState = useCallback(() => setCartToken(null), [setCartToken]);

  const value = useMemo(
    () => ({
      cartState,
      createCartState,
      resetCartState,
    }),
    [cartState, createCartState, resetCartState],
  );

  return (
    <NativeCartStateProvider value={value}>{children}</NativeCartStateProvider>
  );
}

export {CartStateProvider, useCartState};
