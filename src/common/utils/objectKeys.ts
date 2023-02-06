/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow type down */

type ObjectKeys<
  AnyObject extends Record<PropertyKey, unknown>,
  Keys extends Exclude<keyof AnyObject, symbol> = Exclude<
    keyof AnyObject,
    symbol
  >,
> = ReadonlyArray<Keys extends number ? `${Keys}` : Keys>;

export const objectKeys = <AnyObject extends Record<PropertyKey, unknown>>(
  object: AnyObject,
) => Object.keys(object) as unknown as ObjectKeys<AnyObject>;
