/* eslint-disable @typescript-eslint/consistent-type-assertions -- api response */
import invariant from 'invariant';
import wretch from 'wretch';

import {authorization} from '@/app/hooks/useAuthorization';
import {refreshTokenMutation} from '@/common/graphql/mutations/mutations';

import {getResponseData, isUnauthenticated} from './assertions';
import {resolveRequestDocument} from './resolveRequestDocument';

import type {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '@/common/graphql/generated/graphql';
import type {DocumentNode} from 'graphql';

type AnyVariables = Record<string, unknown>;

const apiUrl = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

invariant(apiUrl, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

let refreshTokenMutationPromise: Promise<RefreshTokenMutation> | null = null;

export const request = <
  Resolved,
  Variables extends AnyVariables = AnyVariables,
>(
  documentNode: DocumentNode,
  variables?: Variables,
): Promise<Resolved> => {
  const {token, csrfToken} = authorization.getState();
  const {query, operationName} = resolveRequestDocument(documentNode);

  return wretch(apiUrl)
    .headers({...(token && {Authorization: `Bearer ${token}`})})
    .post({
      query,
      ...(variables && {operationName}),
      ...(variables && {variables}),
    })
    .json()
    .then(getResponseData)
    .then(async (data) => {
      if (isUnauthenticated(data)) {
        if (!refreshTokenMutationPromise && csrfToken) {
          refreshTokenMutationPromise = request<
            RefreshTokenMutation,
            RefreshTokenMutationVariables
          >(refreshTokenMutation, {csrfToken});
        }

        const {tokenRefresh} = (await refreshTokenMutationPromise) ?? {};

        refreshTokenMutationPromise = null;

        if (tokenRefresh?.token) {
          authorization.updateToken(tokenRefresh?.token);

          return request(documentNode, variables);
        }

        authorization.logout();
      }

      return data;
    }) as Promise<Resolved>;
};
