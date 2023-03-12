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

const codegenConfig: CodegenConfig = {
  schema,
  debug: true,
  documents: 'graphql/**/*.ts',
  hooks: {
    afterAllFileWrite: 'pnpm run format',
  },
  generates: {
    'graphql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [warningPlugin, '@graphql-codegen/typescript-react-query'],
      // TODO: fix config of typescript-react-query
      config: {
        fetcher: {
          func: '../app/queryClient/request/request#request',
          isReactHook: true,
        },
        exposeDocument: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        legacyMode: false,
        dedupeFragments: true,
      },
    },
  },
};

export default codegenConfig;
