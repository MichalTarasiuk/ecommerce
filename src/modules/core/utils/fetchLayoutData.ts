import {request} from '@/app/queryClient/request/request';
import {mainMenuQuery} from '@/common/graphql/queries/queries';
import {isError} from '@/common/utils/utils';

import type {
  LanguageCodeEnum,
  MainMenuQueryVariables,
} from '@/common/types/generated/graphql';
import type {QueryClient} from '@tanstack/react-query';

type FetchLayoutDataConfig = {
  readonly region: {
    readonly channel: string;
    readonly languageCode: LanguageCodeEnum;
  };
  readonly isNextLinkRequest: boolean;
};

const logError = (reason: unknown) => {
  if (isError(reason)) {
    console.error(reason.message);
  }
};

export const fetchLayoutData = async (
  queryClient: QueryClient,
  {region, isNextLinkRequest}: FetchLayoutDataConfig,
) => {
  if (!isNextLinkRequest) {
    await Promise.all([
      queryClient
        .prefetchQuery({
          queryKey: ['main-menu'],
          queryFn: () =>
            request<unknown, MainMenuQueryVariables>(mainMenuQuery, region),
        })
        .catch(logError),
    ]);
  }
};
