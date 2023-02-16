/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment AccountErrorFragment on AccountError {\n  code\n  field\n  message\n}": types.AccountErrorFragmentFragmentDoc,
    "fragment MenuItemFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}": types.MenuItemFragmentFragmentDoc,
    "fragment MenuItemWithChildrenFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItemFragment\n    children {\n      ...MenuItemFragment\n    }\n  }\n  url\n}": types.MenuItemWithChildrenFragmentFragmentDoc,
    "mutation ConfirmAccount($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    errors {\n      ...AccountErrorFragment\n    }\n    user {\n      email\n      isActive\n    }\n  }\n}": types.ConfirmAccountDocument,
    "mutation Register($input: AccountRegisterInput!) {\n  accountRegister(input: $input) {\n    errors {\n      ...AccountErrorFragment\n    }\n    requiresConfirmation\n  }\n}": types.RegisterDocument,
    "query Channels {\n  channels {\n    id\n    slug\n    name\n    isActive\n  }\n}": types.ChannelsDocument,
    "query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildrenFragment\n    }\n  }\n}": types.MainMenuDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment AccountErrorFragment on AccountError {\n  code\n  field\n  message\n}"): (typeof documents)["fragment AccountErrorFragment on AccountError {\n  code\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MenuItemFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}"): (typeof documents)["fragment MenuItemFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  url\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MenuItemWithChildrenFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItemFragment\n    children {\n      ...MenuItemFragment\n    }\n  }\n  url\n}"): (typeof documents)["fragment MenuItemWithChildrenFragment on MenuItem {\n  id\n  name\n  translation(languageCode: $languageCode) {\n    id\n    name\n  }\n  category {\n    id\n    slug\n  }\n  collection {\n    id\n    slug\n  }\n  page {\n    id\n    slug\n  }\n  children {\n    ...MenuItemFragment\n    children {\n      ...MenuItemFragment\n    }\n  }\n  url\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ConfirmAccount($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    errors {\n      ...AccountErrorFragment\n    }\n    user {\n      email\n      isActive\n    }\n  }\n}"): (typeof documents)["mutation ConfirmAccount($email: String!, $token: String!) {\n  confirmAccount(email: $email, token: $token) {\n    errors {\n      ...AccountErrorFragment\n    }\n    user {\n      email\n      isActive\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: AccountRegisterInput!) {\n  accountRegister(input: $input) {\n    errors {\n      ...AccountErrorFragment\n    }\n    requiresConfirmation\n  }\n}"): (typeof documents)["mutation Register($input: AccountRegisterInput!) {\n  accountRegister(input: $input) {\n    errors {\n      ...AccountErrorFragment\n    }\n    requiresConfirmation\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Channels {\n  channels {\n    id\n    slug\n    name\n    isActive\n  }\n}"): (typeof documents)["query Channels {\n  channels {\n    id\n    slug\n    name\n    isActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildrenFragment\n    }\n  }\n}"): (typeof documents)["query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n  menu(slug: \"navbar\", channel: $channel) {\n    id\n    items {\n      ...MenuItemWithChildrenFragment\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;