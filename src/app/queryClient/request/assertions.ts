/* eslint-disable @typescript-eslint/consistent-type-assertions -- to unknown */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- optional chaining (?.) */
import {isArray} from '@/common/utils/utils';

export const isUnauthenticated = (data: unknown) => {
  const errors: unknown = (data as any).errors;

  return (
    isArray(errors) &&
    errors.some(
      (error) =>
        (error as any)?.extensions?.exception?.code === 'ExpiredSignatureError',
    )
  );
};
