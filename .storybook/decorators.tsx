import I18nProvider from 'next-translate/I18nProvider';
import React from 'react';

import {inconsolata} from '@/app/fonts';
import accountRegisterNamespace from '@/app/locales/en-US/account/register.json';
import commonNamespace from '@/app/locales/pl-PL/common.json';
import {i18nConfig} from '@root/i18n';

import type {StoryFn} from '@storybook/react';

export const FontDecorator = (Story: StoryFn) => {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${inconsolata.style.fontFamily};
          }
        `}
      </style>
      <Story />
    </>
  );
};

export const TranslateDecorator = (Story: StoryFn) => {
  return (
    <I18nProvider
      lang={i18nConfig.defaultLocale}
      namespaces={{
        common: commonNamespace,
        ['account.register']: accountRegisterNamespace,
      }}
    >
      <Story />
    </I18nProvider>
  );
};
