import {useQuery} from '@tanstack/react-query';
import {useCallback, useMemo} from 'react';

import {request} from '@/app/queryClient/queryClient';
import {cartByTokenQuery} from '@/common/graphql/queries/cartByTokenQuery';
import {useLocalStorage} from '@/common/hooks/useLocalStorage';
import {useRegion} from '@/common/hooks/useRegion';
import {createSafeContext, isClient, isString} from '@/common/utils/utils';

import {getOnlineCartState} from './helpers';
import {useCreateOnlineCartMutation} from './useCreateOnlineCartMutation';

import type {
  CartByTokenQuery,
  CartByTokenQueryVariables,
  CreateCartMutationVariables,
} from '@/common/types/generated/graphql';
import type {InferProps} from '@/common/types/types';

type OnlineCartState = ReturnType<typeof getOnlineCartState>;

type OnlineCartProviderProps = ObjectType.Required<
  Omit<InferProps<typeof NativeOnlineCartProvider>, 'value'>,
  'children'
>;

type OnlineCartContextValue = {
  readonly onlineCartState: OnlineCartState;
  readonly createOnlineCart: (
    createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
  ) => Promise<string | null>;
  readonly resetCartToken: FunctionType.Noop;
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

  const {onlineCartMutationState, createOnlineCartMutate} =
    useCreateOnlineCartMutation({
      cartToken,
    });
  const {data: {cart: fallbackCart} = {}} = useQuery({
    queryKey: ['cart-by-token'],
    queryFn: () =>
      request<CartByTokenQuery, CartByTokenQueryVariables>(cartByTokenQuery, {
        cartToken,
      }),
    enabled: isClient() && Boolean(cartToken) && !onlineCartMutationState,
  });

  const onlineCartState = useMemo(
    () => onlineCartMutationState ?? getOnlineCartState(fallbackCart),
    [onlineCartMutationState, fallbackCart],
  );

  const createOnlineCart = useCallback(
    async (
      createCartMutationVariables: Omit<CreateCartMutationVariables, 'channel'>,
    ) => {
      const {cart} =
        (
          await createOnlineCartMutate({
            ...createCartMutationVariables,
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
    }),
    [createOnlineCart, onlineCartState, resetCartToken],
  );

  return (
    <NativeOnlineCartProvider value={value}>
      {children}
    </NativeOnlineCartProvider>
  );
}

export {OnlineCartProvider, useOnlineCart};
