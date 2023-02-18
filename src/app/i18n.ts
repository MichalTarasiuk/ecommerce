import appWithI18n from 'next-translate/appWithI18n';

import type {ExtendedI18nConfig} from '@root/i18n';
import type {NextComponentType, NextPageContext} from 'next';
import type {AppProps} from 'next/app';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- extend config type
export const typedAppWithI18n = appWithI18n as unknown as (
  nextComponent: NextComponentType<NextPageContext, unknown, AppProps>,
  config?: ExtendedI18nConfig,
) => ReturnType<typeof appWithI18n>;
