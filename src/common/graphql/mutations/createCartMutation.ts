import gql from 'graphql-tag';

import {cartFragment, checkoutErrorFragment} from '../fragments/fragments';

export const createCartMutation = gql`
  mutation CreateCart(
    $email: String
    $lines: [CheckoutLineInput!]!
    $channel: String!
  ) {
    checkoutCreate(input: {channel: $channel, email: $email, lines: $lines}) {
      checkout {
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
