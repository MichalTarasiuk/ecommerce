import gql from 'graphql-tag';

export const channelsQuery = gql`
  query Channels {
    channels {
      id
      slug
      name
      isActive
    }
  }
`;
