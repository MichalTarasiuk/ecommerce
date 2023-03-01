import gql from 'graphql-tag';

import {checkoutErrorFragment} from '../fragments/fragments';

export const cartAddProductLineMutation = gql`
  mutation cartAddProductLine($cartToken: UUID!, $variantId: ID!) {
    cartLinesAdd: checkoutLinesAdd(
      token: $cartToken
      lines: [{quantity: 1, variantId: $variantId}]
    ) {
      errors {
        ...CheckoutErrorFragment
      }
    }
  }
  ${checkoutErrorFragment}
`;
