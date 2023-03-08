import invariant from 'invariant';

import type {CodegenConfig} from '@graphql-codegen/cli';

const schema = process.env['NEXT_PUBLIC_SALEOR_API_URL'];

invariant(schema, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

const warningPlugin = {
  add: {
    content: `/**
* NOTE: THIS IS AN AUTO-GENERATED FILE. DO NOT MODIFY IT DIRECTLY.
*/`,
  },
};

const config: CodegenConfig = {
  schema,
  debug: true,
  documents: 'graphql/**/*.ts',
  hooks: {
    afterAllFileWrite: 'pnpm run format',
  },
  generates: {
    'types/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [warningPlugin],
    },
  },
};

export default config;
