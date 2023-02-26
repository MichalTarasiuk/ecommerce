import gql from 'graphql-tag';

import {cartFragment} from '../fragments/fragments';

export const cartByTokenQuery = gql`
  query CartByToken($cartToken: UUID!) {
    checkout(token: $cartToken) {
      ...CartFragment
    }
  }
  ${cartFragment}
`;
