import gql from 'graphql-tag';

export const checkoutErrorFragment = gql`
  fragment CheckoutErrorFragment on CheckoutError {
    field
    message
    code
  }
`;
