import gql from 'graphql-tag';

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
    message
  }
`;
