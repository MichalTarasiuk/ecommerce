import {request} from '~app/queryClient/queryClient';
import {mainMenuQuery} from '~graphql/queries/queries';
import {isError} from '~utils/utils';

import type {QueryClient} from '@tanstack/react-query';
import type {
  LanguageCodeEnum,
  MainMenuQueryVariables,
} from '~types/generated/graphql';

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
