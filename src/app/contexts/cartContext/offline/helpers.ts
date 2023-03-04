import {
  hasOwn,
  isArray,
  isNumber,
  isObject,
  isString,
} from '@/common/utils/utils';

import type {CheckoutLineInput} from '@/common/types/generated/graphql';

// eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
type CartLines = Array<CheckoutLineInput>;

export type OfflineCart = {
  readonly cartToken: string;
  readonly lines: CartLines;
};

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

export const isOfflineCart = (value: unknown): value is OfflineCart => {
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
