import {
  hasOwn,
  isArray,
  isNumber,
  isString,
  isObject,
} from '@/common/utils/utils';

import type {Cart} from './types';
import type {
  CheckoutLineInput,
  CreateCartMutation,
} from '@/common/types/generated/graphql';

const isCartLine = (value: unknown): value is CheckoutLineInput => {
  if (!isObject(value)) {
    return false;
  }

  return (
    hasOwn(value, 'variantId') &&
    isString(value.variantId) &&
    hasOwn(value, 'quantity') &&
    isNumber(value.quantity)
  );
};

export const isCart = (value: unknown): value is Cart => {
  if (!isObject(value)) {
    return false;
  }

  const hasCartToken = hasOwn(value, 'cartToken') && isString(value.cartToken);
  const hasLines =
    hasOwn(value, 'lines') &&
    isArray(value.lines) &&
    value.lines.every(isCartLine);

  return hasCartToken && hasLines;
};

export const getCartState = (
  cart: NonNullable<CreateCartMutation['cartCreate']>['cart'],
) => {
  if (cart?.token && isString(cart.token)) {
    const {token: cartToken, id} = cart;

    return {cartToken, id};
  }

  return null;
};
