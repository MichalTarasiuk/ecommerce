import nextTranslate from 'next-translate';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return webpackConfig;
  },
};

export default nextTranslate(nextConfig);
