/* eslint-disable @typescript-eslint/consistent-type-assertions -- api response */

import wretch from 'wretch';

import {session} from '~composables/session';
import {appConfig} from '~constants/appConfig';
import {refreshTokenMutation} from '~graphql/mutations/mutations';

import {getResponseData, isUnauthenticated} from './assertions';
import {resolveRequestDocument} from './resolveRequestDocument';

import type {DocumentNode} from 'graphql';
import type {
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
} from '~types/generated/graphql';

type AnyVariables = Record<string, unknown>;

let refreshTokenMutationPromise: Promise<RefreshTokenMutation> | null = null;

export const request = <
  Resolved,
  Variables extends AnyVariables = AnyVariables,
>(
  documentNode: DocumentNode,
  variables?: Variables,
): Promise<Resolved> => {
  const {token, csrfToken} = session.getState();
  const {query, operationName} = resolveRequestDocument(documentNode);

  return wretch(appConfig.apiUrl)
    .headers({...(token && {Authorization: `Bearer ${token}`})})
    .post({
      query,
      ...(operationName && {operationName}),
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
          session.updateToken(tokenRefresh?.token);

          return request(documentNode, variables);
        }

        session.logout();
      }

      return data;
    }) as Promise<Resolved>;
};
