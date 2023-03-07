import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';

import {i18nConfig} from '~config/i18n';
import accountChangePasswordNamespace from '~locales/en-US/account/change-password.json';
import accountForgotPasswordNamespace from '~locales/en-US/account/forgot-password.json';
import accountLoginNamespace from '~locales/en-US/account/login.json';
import accountRegisterNamespace from '~locales/en-US/account/register.json';
import checkoutNamespace from '~locales/en-US/checkout.json';
import commonNamespace from '~locales/en-US/common.json';

import type {StoryFn} from '@storybook/react';
import type {I18nDictionary} from 'next-translate';
import type {InferNamespaceKey} from '~composables/translate/translate';

const namespaces: Record<
  InferNamespaceKey<(typeof i18nConfig)['pages']>,
  I18nDictionary
> = {
  common: commonNamespace,
  checkout: checkoutNamespace,
  'account.register': accountRegisterNamespace,
  'account.login': accountLoginNamespace,
  'account.forgot-password': accountForgotPasswordNamespace,
  'account.change-password': accountChangePasswordNamespace,
};

export function TranslateDecorator(Story: StoryFn) {
  return (
    <I18nProvider lang={i18nConfig.defaultLocale} namespaces={namespaces}>
      <Story />
    </I18nProvider>
  );
}
