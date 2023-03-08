import {useCallback, useMemo} from 'react';

import {useRegion} from 'lib/region/useRegion';
import {createSafeContext} from 'lib/safeContext';
import {useLocalStorage} from 'lib/sideEffect/sideEffect';
import {isString} from 'utils/utils';

import {getCartState} from './helpers';
import {useCartByToken, useCartMutation} from './hooks';

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

  const {cartMutationState, createCartMutate} = useCartMutation();
  const cartByTokenState = useCartByToken({
    cartToken,
    enabled: Boolean(cartToken) && !cartMutationState,
  });

  const cartState = useMemo(
    () => cartMutationState ?? getCartState(cartByTokenState),
    [cartByTokenState, cartMutationState],
  );

  const createCartState = useCallback(
    async (cartLine: CartLine) => {
      const lines = [cartLine];

      const {cart} =
        (
          await createCartMutate({
            lines,
            channel: region.variables.channel,
          })
        ).cartCreate ?? {};

      if (cart?.token && isString(cart.token)) {
        setCartToken(cart.token);
      }
    },
    [region.variables.channel, createCartMutate, setCartToken],
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
