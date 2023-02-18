/* eslint-disable @typescript-eslint/consistent-type-assertions -- request */
import invariant from 'invariant';
import wretch from 'wretch';

import {resolveRequestDocument} from './resolveRequestDocument';

import type {DocumentNode} from 'graphql';

type AnyVariables = Record<string, unknown>;

const apiUrl = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

invariant(apiUrl, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

export const request = <
  Resolved,
  Variables extends AnyVariables = AnyVariables,
>(
  documentNode: DocumentNode,
  variables?: Variables,
) => {
  const {query, operationName} = resolveRequestDocument(documentNode);

  return wretch(apiUrl)
    .post({
      query,
      operationName,
      ...(variables && {variables}),
    })
    .json() as Promise<Resolved>;
};
