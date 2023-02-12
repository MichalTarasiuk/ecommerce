import type {CodegenConfig} from '@graphql-codegen/cli';

const schema = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

if (!schema) {
  throw Error(`process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);
}

const config: CodegenConfig = {
  schema,
  overwrite: true,
  documents: 'src/**/*.graphql',
  generates: {
    'src/common/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
