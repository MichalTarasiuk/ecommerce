import gql from 'graphql-tag';

export const meQuery = gql`
  query Me {
    me {
      email
    }
  }
`;
