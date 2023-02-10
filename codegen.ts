import {graphqlUrl as schema} from '@/app/queryClient/queryClient';

import type {CodegenConfig} from '@graphql-codegen/cli';

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
