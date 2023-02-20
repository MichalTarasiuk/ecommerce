import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const changePasswordMutation = gql`
  mutation changePassword(
    $token: String!
    $email: String!
    $password: String!
  ) {
    setPassword(token: $token, email: $email, password: $password) {
      errors {
        ...AccountErrorFragment
      }
      token
      csrfToken
    }
  }
  ${accountErrorFragment}
`;
