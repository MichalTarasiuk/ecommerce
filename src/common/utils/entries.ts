/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow down type */
type Entries<AnyObject extends Record<PropertyKey, unknown>> = ReadonlyArray<
  {
    readonly [Key in keyof AnyObject]: readonly [Key, AnyObject[Key]];
  }[keyof AnyObject]
>;

export const entries = <AnyObject extends Record<PropertyKey, unknown>>(
  anyObject: AnyObject,
) => Object.entries(anyObject) as unknown as Entries<AnyObject>;
