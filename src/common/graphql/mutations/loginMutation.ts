import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      csrfToken
      token
      errors {
        ...AccountErrorFragment
      }
    }
  }
  ${accountErrorFragment}
`;
