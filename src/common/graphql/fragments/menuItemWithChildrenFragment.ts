import gql from 'graphql-tag';

import {menuItemFragment} from './menuItemFragment';

export const menuItemWithChildrenFragment = gql`
  fragment MenuItemWithChildrenFragment on MenuItem {
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
    children {
      ...MenuItemFragment
      children {
        ...MenuItemFragment
      }
    }
    url
  }
  ${menuItemFragment}
`;
