import gql from 'graphql-tag';

export const verifyTokenMutation = gql`
  mutation verifyToken($token: String!) {
    tokenVerify(token: $token) {
      isValid
    }
  }
`;
