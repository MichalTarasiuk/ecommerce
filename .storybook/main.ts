import {Custom, FunctionType} from '@/common/types/types';
import {
  isString,
  isRegExp,
  isArray,
  isObject,
  keyIn,
  isFunction,
} from '@/common/utils/utils';

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

type ObjectRuleSetUseItem = {
  loader: string;
  options: {
    plugins: Array<FunctionType.Any | string>;
  };
};

const isObjectRuleSetUseItem = (
  value: unknown,
): value is ObjectRuleSetUseItem => {
  const hasName =
    isObject(value) && keyIn(value, 'loader') && isString(value.loader);

  const hasOptions =
    isObject(value) && keyIn(value, 'options') && isObject(value.options);
  const hasPlugins =
    hasOptions &&
    keyIn(value.options, 'plugins') &&
    isArray(value.options.plugins) &&
    value.options.plugins.some(
      (plugin) => isString(plugin) || isFunction(plugin),
    );

  return hasName && hasPlugins;
};

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
  webpackFinal: (webpackConfig) => {
    // svgr
    const ruleSetRules =
      webpackConfig.module?.rules?.filter(
        (rule): rule is RuleSetRule => !isString(rule),
      ) ?? [];
    const fileLoaderRule = ruleSetRules.find(
      (rule) => isRegExp(rule.test) && rule.test.test('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /.svg$/;

      webpackConfig.module?.rules?.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      });
    }

    // next font
    webpackConfig.module?.rules?.forEach(
      (rule) =>
        !isString(rule) &&
        isArray(rule.use) &&
        rule.use.forEach((ruleSetUseItem) => {
          if (
            isObjectRuleSetUseItem(ruleSetUseItem) &&
            ruleSetUseItem.loader.includes('babel-loader')
          ) {
            ruleSetUseItem.options.plugins.push(
              '@babel/plugin-transform-typescript',
            );
          }
        }),
    );

    return webpackConfig;
  },
};
export default config;
