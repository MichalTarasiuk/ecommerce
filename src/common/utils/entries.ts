import type {NumberType} from '@/common/types/types';

/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow down type */
type Entries<
  AnyObject extends Record<PropertyKey, unknown>,
  Keys extends Exclude<keyof AnyObject, symbol> = Exclude<
    keyof AnyObject,
    symbol
  >,
> = ReadonlyArray<
  {
    readonly [Key in NumberType.ToString<Keys>]: readonly [Key, AnyObject[Key]];
  }[NumberType.ToString<Keys>]
>;

export const entries = <AnyObject extends Record<PropertyKey, unknown>>(
  anyObject: AnyObject,
) => Object.entries(anyObject) as unknown as Entries<AnyObject>;
