import {useCallback, useMemo} from 'react';

import {useLocalStorage} from '@/common/hooks/useLocalStorage';
import {useRegion} from '@/common/hooks/useRegion';
import {createSafeContext, isString} from '@/common/utils/utils';

import {useOnlineCartAddProductLine} from './useOnlineCartAddProductLine';
import {useOnlineCartState} from './useOnlineCartState';

import type {getOnlineCartState} from './helpers';
import type {CartLine} from '../types';
import type {ReactNode} from 'react';

type OnlineCartProviderProps = {
  readonly children: ReactNode;
};

type OnlineCartState = ReturnType<typeof getOnlineCartState>;

type OnlineCartContextValue = {
  readonly onlineCartState: OnlineCartState;
  readonly createOnlineCart: (cartLine: CartLine) => Promise<string | null>;
  readonly resetCartToken: FunctionType.Noop;
  readonly onlineCartAddProductLine: ReturnType<
    typeof useOnlineCartAddProductLine
  >;
};

const cartTokenName = 'cartToken';

const [NativeOnlineCartProvider, useOnlineCart] =
  createSafeContext<OnlineCartContextValue>('onlineCart');

function OnlineCartProvider({children}: OnlineCartProviderProps) {
  const [cartToken, setCartToken] = useLocalStorage(
    cartTokenName,
    (nextCartToken) => (isString(nextCartToken) ? nextCartToken : null),
  );
  const region = useRegion();

  const {onlineCartState, createOnlineCartMutate} =
    useOnlineCartState(cartToken);
  const onlineCartAddProductLine = useOnlineCartAddProductLine(cartToken);

  const createOnlineCart = useCallback(
    async (cartLine: CartLine) => {
      const lines = [cartLine];

      const {cart} =
        (
          await createOnlineCartMutate({
            lines,
            channel: region.variables.channel,
          })
        ).cartCreate ?? {};

      if (cart?.token && isString(cart.token)) {
        setCartToken(cart.token);

        return cart.token;
      }

      return null;
    },
    [region.variables.channel, createOnlineCartMutate, setCartToken],
  );

  const resetCartToken = useCallback(() => setCartToken(null), [setCartToken]);

  const value = useMemo(
    () => ({
      onlineCartState,
      createOnlineCart,
      resetCartToken,
      onlineCartAddProductLine,
    }),
    [
      createOnlineCart,
      onlineCartAddProductLine,
      onlineCartState,
      resetCartToken,
    ],
  );

  return (
    <NativeOnlineCartProvider value={value}>
      {children}
    </NativeOnlineCartProvider>
  );
}

export {OnlineCartProvider, useOnlineCart};
