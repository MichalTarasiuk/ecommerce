import {z} from 'zod';

const environmentSchema = z.object({
  NEXT_PUBLIC_SALEOR_API_URL: z.string().url(),
  NEXT_PUBLIC_HOSTNAME: z.string(),
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
