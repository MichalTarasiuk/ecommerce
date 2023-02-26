import {isString} from '@/common/utils/utils';

import type {CreateCartMutation} from '@/common/types/generated/graphql';

type Cart = NonNullable<CreateCartMutation['cartCreate']>['cart'];

export const getCartState = (cart: Cart) => {
  if (cart?.token && isString(cart.token)) {
    const {token, id} = cart;

    return {token, id};
  }

  return null;
};
