import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const refreshTokenMutation = gql`
  mutation refreshToken($csrfToken: String!) {
    tokenRefresh(csrfToken: $csrfToken) {
      token
      errors {
        ...AccountErrorFragment
      }
    }
  }
  ${accountErrorFragment}
`;
