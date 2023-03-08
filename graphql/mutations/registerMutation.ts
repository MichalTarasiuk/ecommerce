import gql from 'graphql-tag';

import {accountErrorFragment} from '../fragments/fragments';

export const registerMutation = gql`
  mutation Register($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      errors {
        ...AccountErrorFragment
      }
      requiresConfirmation
    }
  }
  ${accountErrorFragment}
`;
