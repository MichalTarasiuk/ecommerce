import gql from 'graphql-tag';

import {cartFragment, checkoutErrorFragment} from '../fragments/fragments';

export const createCartMutation = gql`
  mutation CreateCart(
    $email: String
    $lines: [CheckoutLineInput!]!
    $channel: String!
  ) {
    cartCreate: checkoutCreate(
      input: {channel: $channel, email: $email, lines: $lines}
    ) {
      cart: checkout {
        ...CartFragment
      }
      errors {
        ...CheckoutErrorFragment
      }
    }
  }
  ${cartFragment}
  ${checkoutErrorFragment}
`;
