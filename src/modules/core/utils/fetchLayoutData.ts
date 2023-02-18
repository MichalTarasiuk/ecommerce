import {mainMenuQuery} from '@/common/graphql/queries/queries';

import type {
  LanguageCodeEnum,
  MainMenuQuery,
  MainMenuQueryVariables,
} from '@/common/graphql/generated/graphql';
import type {Client, OperationResult} from 'urql';

type FetchLayoutDataConfig = {
  readonly region: {
    readonly channel: string;
    readonly languageCode: LanguageCodeEnum;
  };
  readonly isNextLinkRequest: boolean;
};

const logQueriesErrors = (operationResults: readonly OperationResult[]) => {
  operationResults.forEach((operationResult) => {
    if (operationResult.error) {
      console.error(operationResult.error.message);
    }
  });
};

export const fetchLayoutData = async (
  client: Client,
  {region, isNextLinkRequest}: FetchLayoutDataConfig,
) => {
  if (!isNextLinkRequest) {
    await Promise.all([
      client
        .query<MainMenuQuery, MainMenuQueryVariables>(mainMenuQuery, region)
        .toPromise(),
    ]).then(logQueriesErrors);
  }
};
