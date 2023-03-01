import {isString} from '@/common/utils/utils';

import type {CreateCartMutation} from '@/common/types/generated/graphql';

type Cart = NonNullable<CreateCartMutation['cartCreate']>['cart'];

export const getCartState = (cart: Cart) => {
  if (cart?.token && isString(cart.token)) {
    const {token: cartToken, id} = cart;

    return {cartToken, id};
  }

  return null;
};
