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
    "\n  fragment AccountErrorFragment on AccountError {\n    code\n    field\n    message\n  }\n": types.AccountErrorFragmentFragmentDoc,
    "\n  fragment MenuItemFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    url\n  }\n": types.MenuItemFragmentFragmentDoc,
    "\n  fragment MenuItemWithChildrenFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    children {\n      ...MenuItemFragment\n      children {\n        ...MenuItemFragment\n      }\n    }\n    url\n  }\n  \n": types.MenuItemWithChildrenFragmentFragmentDoc,
    "\n  mutation changePassword(\n    $token: String!\n    $email: String!\n    $password: String!\n  ) {\n    setPassword(token: $token, email: $email, password: $password) {\n      errors {\n        ...AccountErrorFragment\n      }\n      token\n      csrfToken\n    }\n  }\n  \n": types.ChangePasswordDocument,
    "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      errors {\n        ...AccountErrorFragment\n      }\n      user {\n        email\n        isActive\n      }\n    }\n  }\n  \n": types.ConfirmAccountDocument,
    "\n  mutation login($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      csrfToken\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n": types.LoginDocument,
    "\n  mutation refreshToken($csrfToken: String!) {\n    tokenRefresh(csrfToken: $csrfToken) {\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n": types.RefreshTokenDocument,
    "\n  mutation Register($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      errors {\n        ...AccountErrorFragment\n      }\n      requiresConfirmation\n    }\n  }\n  \n": types.RegisterDocument,
    "\n  mutation requestPasswordReset(\n    $email: String!\n    $redirectUrl: String!\n    $channel: String!\n  ) {\n    requestPasswordReset(\n      email: $email\n      redirectUrl: $redirectUrl\n      channel: $channel\n    ) {\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n": types.RequestPasswordResetDocument,
    "\n  mutation verifyToken($token: String!) {\n    tokenVerify(token: $token) {\n      isValid\n    }\n  }\n": types.VerifyTokenDocument,
    "\n  query Channels {\n    channels {\n      id\n      slug\n      name\n      isActive\n    }\n  }\n": types.ChannelsDocument,
    "\n  query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildrenFragment\n      }\n    }\n  }\n  \n": types.MainMenuDocument,
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
export function graphql(source: "\n  fragment AccountErrorFragment on AccountError {\n    code\n    field\n    message\n  }\n"): (typeof documents)["\n  fragment AccountErrorFragment on AccountError {\n    code\n    field\n    message\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuItemFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    url\n  }\n"): (typeof documents)["\n  fragment MenuItemFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    url\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MenuItemWithChildrenFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    children {\n      ...MenuItemFragment\n      children {\n        ...MenuItemFragment\n      }\n    }\n    url\n  }\n  \n"): (typeof documents)["\n  fragment MenuItemWithChildrenFragment on MenuItem {\n    id\n    name\n    translation(languageCode: $languageCode) {\n      id\n      name\n    }\n    category {\n      id\n      slug\n    }\n    collection {\n      id\n      slug\n    }\n    page {\n      id\n      slug\n    }\n    children {\n      ...MenuItemFragment\n      children {\n        ...MenuItemFragment\n      }\n    }\n    url\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changePassword(\n    $token: String!\n    $email: String!\n    $password: String!\n  ) {\n    setPassword(token: $token, email: $email, password: $password) {\n      errors {\n        ...AccountErrorFragment\n      }\n      token\n      csrfToken\n    }\n  }\n  \n"): (typeof documents)["\n  mutation changePassword(\n    $token: String!\n    $email: String!\n    $password: String!\n  ) {\n    setPassword(token: $token, email: $email, password: $password) {\n      errors {\n        ...AccountErrorFragment\n      }\n      token\n      csrfToken\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      errors {\n        ...AccountErrorFragment\n      }\n      user {\n        email\n        isActive\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation ConfirmAccount($email: String!, $token: String!) {\n    confirmAccount(email: $email, token: $token) {\n      errors {\n        ...AccountErrorFragment\n      }\n      user {\n        email\n        isActive\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      csrfToken\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation login($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      csrfToken\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation refreshToken($csrfToken: String!) {\n    tokenRefresh(csrfToken: $csrfToken) {\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation refreshToken($csrfToken: String!) {\n    tokenRefresh(csrfToken: $csrfToken) {\n      token\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      errors {\n        ...AccountErrorFragment\n      }\n      requiresConfirmation\n    }\n  }\n  \n"): (typeof documents)["\n  mutation Register($input: AccountRegisterInput!) {\n    accountRegister(input: $input) {\n      errors {\n        ...AccountErrorFragment\n      }\n      requiresConfirmation\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation requestPasswordReset(\n    $email: String!\n    $redirectUrl: String!\n    $channel: String!\n  ) {\n    requestPasswordReset(\n      email: $email\n      redirectUrl: $redirectUrl\n      channel: $channel\n    ) {\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation requestPasswordReset(\n    $email: String!\n    $redirectUrl: String!\n    $channel: String!\n  ) {\n    requestPasswordReset(\n      email: $email\n      redirectUrl: $redirectUrl\n      channel: $channel\n    ) {\n      errors {\n        ...AccountErrorFragment\n      }\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation verifyToken($token: String!) {\n    tokenVerify(token: $token) {\n      isValid\n    }\n  }\n"): (typeof documents)["\n  mutation verifyToken($token: String!) {\n    tokenVerify(token: $token) {\n      isValid\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Channels {\n    channels {\n      id\n      slug\n      name\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query Channels {\n    channels {\n      id\n      slug\n      name\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildrenFragment\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query MainMenu($languageCode: LanguageCodeEnum!, $channel: String!) {\n    menu(slug: \"navbar\", channel: $channel) {\n      id\n      items {\n        ...MenuItemWithChildrenFragment\n      }\n    }\n  }\n  \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;