import {useCallback, useMemo} from 'react';

import {useLocalStorage} from '@/common/hooks/useLocalStorage';
import {useRegion} from '@/common/hooks/useRegion';
import {createSafeContext, isString} from '@/common/utils/utils';

import {getCartState} from './helpers';
import {useCartByToken} from './useCartByToken';
import {useCartMutation} from './useCartMutation';

import type {CartLine, CartState} from './types';
import type {ReactNode} from 'react';

type CartStateProviderProps = {
  readonly children: ReactNode;
};

type CartStateContextValue = {
  readonly cartState: CartState;
  readonly createStateCart: (cartLine: CartLine) => Promise<void>;
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

  const cartByToken = useCartByToken({
    cartToken,
    enabled: Boolean(cartToken) && !cartMutationState,
  });

  const cartState = useMemo(
    () => cartMutationState ?? getCartState(cartByToken),
    [cartByToken, cartMutationState],
  );

  const createStateCart = useCallback(
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
      createStateCart,
      resetCartState,
    }),
    [cartState, createStateCart, resetCartState],
  );

  return (
    <NativeCartStateProvider value={value}>{children}</NativeCartStateProvider>
  );
}

export {CartStateProvider, useCartState};
