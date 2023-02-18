import {print} from 'graphql';

import type {
  DefinitionNode,
  DocumentNode,
  OperationDefinitionNode,
} from 'graphql';

const isOperationDefinitionNode = (
  definition: DefinitionNode,
): definition is OperationDefinitionNode =>
  definition.kind === 'OperationDefinition';

const extractOperationName = (
  documentNode: DocumentNode,
): string | undefined => {
  const operationDefinition = documentNode.definitions.find(
    isOperationDefinitionNode,
  );

  return operationDefinition?.name?.value;
};

export const resolveRequestDocument = (documentNode: DocumentNode) => {
  const query = print(documentNode);
  const operationName = extractOperationName(documentNode);

  return {
    query,
    operationName,
  };
};
