import type {Debug} from '../types/types';

type KeyIn<
  AnyObject extends Record<PropertyKey, unknown>,
  Key extends PropertyKey,
> = AnyObject & Record<Key, unknown>;

export const keyIn = <
  AnyObject extends Record<PropertyKey, unknown>,
  Key extends PropertyKey,
>(
  anyObject: AnyObject,
  key: Key,
): anyObject is Debug<KeyIn<AnyObject, Key>> => Object.hasOwn(anyObject, key);
