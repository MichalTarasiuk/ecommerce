import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://ecommerce-example-app.eu.saleor.cloud/graphql/',
  documents: 'src/**/*.graphql',
  generates: {
    'src/common/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
