import {Custom} from '@/common/types/types';
import {isString, isRegExp} from '@/common/utils/utils';

import type {StorybookConfig} from '@storybook/nextjs';

type Configuration = Awaited<
  ReturnType<Exclude<StorybookConfig['webpack'], undefined>>
>;

type RuleSetRule = Exclude<
  Custom.ValueOf<
    Exclude<Exclude<Configuration['module'], undefined>['rules'], undefined>
  >,
  string
>;

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: (config) => {
    const ruleSetRules =
      config.module?.rules?.filter(
        (rule): rule is RuleSetRule => !isString(rule),
      ) ?? [];
    const fileLoaderRule = ruleSetRules.find(
      (rule) => isRegExp(rule.test) && rule.test.test('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /.svg$/;

      config.module?.rules?.push({
        test: /.svg$/,
        enforce: 'pre',
        loader: require.resolve('@svgr/webpack'),
      });
    }

    return config;
  },
};
export default config;
