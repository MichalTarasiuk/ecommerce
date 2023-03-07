import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const requestPasswordResetMutation = gql`
  mutation requestPasswordReset(
    $email: String!
    $redirectUrl: String!
    $channel: String!
  ) {
    requestPasswordReset(
      email: $email
      redirectUrl: $redirectUrl
      channel: $channel
    ) {
      errors {
        ...AccountErrorFragment
      }
    }
  }
  ${accountErrorFragment}
`;
