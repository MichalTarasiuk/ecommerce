/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig, {webpack, isServer}) => {
    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.tsx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    const envs = Object.keys(process.env).reduce((collector, env) => {
      if (env.startsWith('NEXT_PUBLIC')) {
        collector[env] = process.env[env];
      }

      return collector;
    }, {});

    if (!isServer) {
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(envs),
        }),
      );
    }

    return webpackConfig;
  },
};

export default nextConfig;
