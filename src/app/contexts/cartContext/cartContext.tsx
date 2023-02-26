import {useCallback, useMemo} from 'react';

import {useLocalStorage} from '@/common/hooks/useLocalStorage';
import {useRegion} from '@/common/hooks/useRegion';
import {createSafeContext, isString} from '@/common/utils/utils';

import {useCreateCartMutation} from './useCreateCartMutation';

import type {CreateCartMutationVariables} from '@/common/types/generated/graphql';
import type {FunctionType, InferProps, ObjectType} from '@/common/types/types';

type CartProviderProps = ObjectType.Required<
  Omit<InferProps<typeof NativeCartProvider>, 'value'>,
  'children'
>;

type CartContextValue = {
  readonly cart: {
    readonly token: string;
    readonly id: string;
  } | null;
  readonly createCart: (
    createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
  ) => Promise<void>;
  readonly resetCartToken: FunctionType.Noop;
};

const cartTokenName = 'cartToken';

const [NativeCartProvider, useCart] =
  createSafeContext<CartContextValue>('cart');

const CartProvider = ({children}: CartProviderProps) => {
  const [cartToken, setCartToken] = useLocalStorage(
    cartTokenName,
    (nextCartToken) => (isString(nextCartToken) ? nextCartToken : null),
  );
  const region = useRegion();

  const {cartState, createCartMutate} = useCreateCartMutation({cartToken});

  const createCart = useCallback(
    async (
      createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
    ) => {
      const {checkout: nextCart} =
        (
          await createCartMutate({
            ...createCartMutationVariables,
            channel: region.variables.channel,
          })
        ).checkoutCreate ?? {};

      if (nextCart?.token && isString(nextCart.token)) {
        setCartToken(nextCart.token);
      }
    },
    [createCartMutate, region.variables.channel, setCartToken],
  );

  const resetCartToken = useCallback(() => setCartToken(null), [setCartToken]);

  const value = useMemo(
    () => ({
      cart: cartState,
      createCart,
      resetCartToken,
    }),
    [cartState, createCart, resetCartToken],
  );

  return <NativeCartProvider value={value}>{children}</NativeCartProvider>;
};

export {CartProvider, useCart};
