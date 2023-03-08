import gql from 'graphql-tag';

export const cartFragment = gql`
  fragment CartFragment on Checkout {
    id
    token
  }
`;
