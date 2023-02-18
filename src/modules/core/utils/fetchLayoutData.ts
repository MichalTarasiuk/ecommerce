import {request} from '@/app/queryClient/request';
import {mainMenuQuery} from '@/common/graphql/queries/queries';
import {isError} from '@/common/utils/utils';

import type {
  LanguageCodeEnum,
  MainMenuQueryVariables,
} from '@/common/graphql/generated/graphql';
import type {QueryClient} from '@tanstack/react-query';

type FetchLayoutDataConfig = {
  readonly region: {
    readonly channel: string;
    readonly languageCode: LanguageCodeEnum;
  };
  readonly isNextLinkRequest: boolean;
};

export const fetchLayoutData = async (
  queryClient: QueryClient,
  {region, isNextLinkRequest}: FetchLayoutDataConfig,
) => {
  if (!isNextLinkRequest) {
    await Promise.all([
      queryClient
        .prefetchQuery({
          queryFn: () =>
            request<unknown, MainMenuQueryVariables>(mainMenuQuery, region),
        })
        .catch(logError),
    ]);
  }
};

const logError = (reason: unknown) => {
  if (isError(reason)) {
    console.log(reason.message);
  }
};
