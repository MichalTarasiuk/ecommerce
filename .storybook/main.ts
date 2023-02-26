import {
  isString,
  isRegExp,
  isArray,
  isObject,
  hasOwn,
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
  readonly loader: string;
  readonly options: {
    // eslint-disable-next-line functional/prefer-readonly-type -- plugins should be writable
    plugins: Array<FunctionType.Any | string>;
  };
};

const isObjectRuleSetUseItem = (
  value: unknown,
): value is ObjectRuleSetUseItem => {
  const hasName =
    isObject(value) && hasOwn(value, 'loader') && isString(value.loader);

  const hasOptions =
    isObject(value) && hasOwn(value, 'options') && isObject(value.options);
  const hasPlugins =
    hasOptions &&
    hasOwn(value.options, 'plugins') &&
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
        issuer: /\.tsx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      });
    }

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

    webpackConfig.resolve = {
      ...webpackConfig.resolve,
      fallback: {
        url: require.resolve('url'),
        path: require.resolve('path-browserify'),
      },
      alias: {
        ...webpackConfig.resolve?.alias,
        'next/router': 'next-router-mock',
      },
    };

    webpackConfig.module?.rules?.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return webpackConfig;
  },
};
export default config;
