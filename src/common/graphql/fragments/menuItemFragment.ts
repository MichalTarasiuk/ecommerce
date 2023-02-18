import gql from 'graphql-tag';

export const menuItemFragment = gql`
  fragment MenuItemFragment on MenuItem {
    id
    name
    translation(languageCode: $languageCode) {
      id
      name
    }
    category {
      id
      slug
    }
    collection {
      id
      slug
    }
    page {
      id
      slug
    }
    url
  }
`;
