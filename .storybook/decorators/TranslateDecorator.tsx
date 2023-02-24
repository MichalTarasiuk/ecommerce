import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';

import accountChangePasswordNamespace from '@/app/locales/en-US/account/change-password.json';
import accountForgotPasswordNamespace from '@/app/locales/en-US/account/forgot-password.json';
import accountLoginNamespace from '@/app/locales/en-US/account/login.json';
import accountRegisterNamespace from '@/app/locales/en-US/account/register.json';
import commonNamespace from '@/app/locales/en-US/common.json';
import {i18nConfig} from '@root/i18n';

import type {InferNamespaceKey} from '@/common/hooks/useTranslate/useTranslate';
import type {StoryFn} from '@storybook/react';
import type {I18nDictionary} from 'next-translate';

const namespaces: Record<
  InferNamespaceKey<(typeof i18nConfig)['pages']>,
  I18nDictionary
> = {
  common: commonNamespace,
  'account.register': accountRegisterNamespace,
  'account.login': accountLoginNamespace,
  'account.forgot-password': accountForgotPasswordNamespace,
  'account.change-password': accountChangePasswordNamespace,
};

export const TranslateDecorator = (Story: StoryFn) => {
  return (
    <I18nProvider lang={i18nConfig.defaultLocale} namespaces={namespaces}>
      <Story />
    </I18nProvider>
  );
};
