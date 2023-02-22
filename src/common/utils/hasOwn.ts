import type {ObjectType} from '../types/types';

type HasOwn<
  AnyObject extends Record<PropertyKey, unknown>,
  Key extends PropertyKey,
> = AnyObject & Record<Key, unknown>;

export const hasOwn = <
  AnyObject extends Record<PropertyKey, unknown>,
  Key extends PropertyKey,
>(
  anyObject: AnyObject,
  key: Key,
): anyObject is ObjectType.Debug<HasOwn<AnyObject, Key>> =>
  Object.hasOwn(anyObject, key);
