import appWithI18n from 'next-translate/appWithI18n';

import {DefaultLayout} from '@/layouts/layouts';
import {i18nConfig} from '@root/i18n';

import {useRouteProgress} from './hooks/hooks';
import {AppProviders} from './providers';

import type {ObjectType} from '@/common/types/types';
import type {NextComponentType, NextPageContext} from 'next';
import type {AppProps} from 'next/app';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- appWithI18n has wrong types by default
const typedAppWithI18n = appWithI18n as unknown as (
  nextComponent: NextComponentType<NextPageContext, unknown, AppProps>,
  config?: ObjectType.Writable<typeof i18nConfig>,
) => ReturnType<typeof appWithI18n>;

const AppInner = ({Component, pageProps}: AppProps) => {
  useRouteProgress();

  return (
    <AppProviders pageProps={pageProps}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProviders>
  );
};

export const App = typedAppWithI18n(AppInner, i18nConfig);
