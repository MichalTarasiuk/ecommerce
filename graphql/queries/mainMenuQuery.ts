import gql from 'graphql-tag';

import {menuItemWithChildrenFragment} from '../fragments/menuItemWithChildrenFragment';

export const mainMenuQuery = gql`
  query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {
    menu(slug: "navbar", channel: $channel) {
      id
      items {
        ...MenuItemWithChildrenFragment
      }
    }
  }
  ${menuItemWithChildrenFragment}
`;
