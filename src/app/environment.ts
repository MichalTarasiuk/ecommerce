import {z} from 'zod';

import {isProduction} from '@/common/utils/utils';

import type {TypeOf} from 'zod';

const fallbackEnvironment = {
  NEXT_PUBLIC_SALEOR_API_URL: 'localhost:8080',
  NEXT_PUBLIC_HOSTNAME: 'localhost',
};

const withDevDefault = <Schema extends z.ZodTypeAny>(
  schema: Schema,
  val: TypeOf<Schema>,
) => (isProduction() ? schema : schema.default(val));

const environmentSchema = z.object({
  NEXT_PUBLIC_SALEOR_API_URL: withDevDefault(
    z.string().url(),
    fallbackEnvironment.NEXT_PUBLIC_SALEOR_API_URL,
  ),
  NEXT_PUBLIC_HOSTNAME: withDevDefault(
    z.string(),
    fallbackEnvironment.NEXT_PUBLIC_HOSTNAME,
  ),
});

const parsed = environmentSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.format(), null, 2),
  );

  process.exit(1);
}

export const environment = parsed.data;
