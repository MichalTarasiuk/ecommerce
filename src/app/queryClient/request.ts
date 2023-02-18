import graphqlRequest from 'graphql-request';
import invariant from 'invariant';

import type {TypedDocumentNode} from '@graphql-typed-document-node/core';
import type {Variables as AnyVariables, RequestDocument} from 'graphql-request';
import type {VariablesAndRequestHeaders} from 'graphql-request/dist/types';

const apiUrl = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

invariant(apiUrl, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

export const request = <Result, Variables extends AnyVariables = AnyVariables>(
  document: RequestDocument | TypedDocumentNode<Result, Variables>,
  ...variablesAndRequestHeaders: VariablesAndRequestHeaders<Variables>
) => graphqlRequest(apiUrl, document, ...variablesAndRequestHeaders);
