import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const forgotPasswordMutation = gql`
  mutation forgotPassword(
    $email: String!
    $redirectUrl: String!
    $channel: String!
  ) {
    forgotPassword: requestPasswordReset(
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
