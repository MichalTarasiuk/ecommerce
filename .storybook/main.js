module.exports = {
  stories: ['../src/common/components/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule?.test?.test('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /.svg$/;

      config.module.rules.push({
        test: /.svg$/,
        enforce: 'pre',
        loader: require.resolve('@svgr/webpack'),
      });
    }
    return config;
  },
};
