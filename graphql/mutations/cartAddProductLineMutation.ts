import gql from 'graphql-tag';

import {checkoutErrorFragment} from '../fragments/fragments';

export const cartAddProductLineMutation = gql`
  mutation cartAddProductLine(
    $cartToken: UUID!
    $lines: [CheckoutLineInput!]!
  ) {
    cartLinesAdd: checkoutLinesAdd(token: $cartToken, lines: $lines) {
      errors {
        ...CheckoutErrorFragment
      }
    }
  }
  ${checkoutErrorFragment}
`;
