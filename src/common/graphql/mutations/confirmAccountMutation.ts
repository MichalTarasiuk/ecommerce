import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const confirmAccountMutation = gql`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      errors {
        ...AccountErrorFragment
      }
      user {
        email
        isActive
      }
    }
  }
  ${accountErrorFragment}
`;
