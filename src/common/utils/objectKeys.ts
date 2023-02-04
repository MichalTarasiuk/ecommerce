/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow type down */

export const objectKeys = <AnyObject extends Record<PropertyKey, unknown>>(
  object: AnyObject,
) => Object.keys(object) as ReadonlyArray<keyof AnyObject>;
