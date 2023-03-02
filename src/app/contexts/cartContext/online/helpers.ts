import {isString} from '@/common/utils/utils';

import type {CreateCartMutation} from '@/common/types/generated/graphql';

type OnlineCart = NonNullable<CreateCartMutation['cartCreate']>['cart'];

export const getOnlineCartState = (onlieCart: OnlineCart) => {
  if (onlieCart?.token && isString(onlieCart.token)) {
    const {token: cartToken, id} = onlieCart;

    return {cartToken, id};
  }

  return null;
};
