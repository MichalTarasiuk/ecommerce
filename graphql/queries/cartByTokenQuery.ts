import gql from 'graphql-tag';

import {cartFragment} from '../fragments/fragments';

export const cartByTokenQuery = gql`
  query CartByToken($cartToken: UUID!) {
    cart: checkout(token: $cartToken) {
      ...CartFragment
    }
  }
  ${cartFragment}
`;
