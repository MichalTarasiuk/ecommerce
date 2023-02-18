import invariant from 'invariant';

import type {CodegenConfig} from '@graphql-codegen/cli';

const schema = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

invariant(schema, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

const config: CodegenConfig = {
  schema,
  overwrite: true,
  documents: 'src/**/*.ts',
  generates: {
    'src/common/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
