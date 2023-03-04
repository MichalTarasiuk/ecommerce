import type {CheckoutLineInput} from '@/common/types/generated/graphql';

export type CartLine = Pick<CheckoutLineInput, 'variantId' | 'quantity'>;
// eslint-disable-next-line functional/prefer-readonly-type -- should be writeable
type CartLines = Array<CartLine>;

export type Cart = {
  readonly cartToken: string;
  readonly lines: CartLines;
};
