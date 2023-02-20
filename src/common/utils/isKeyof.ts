import {objectKeys} from './objectKeys';

export const isKeyof = <AnyObject extends Record<PropertyKey, unknown>>(
  anyObject: AnyObject,
  key: PropertyKey,
): key is keyof AnyObject =>
  objectKeys(anyObject).some((anyObjectKey) => anyObjectKey === key);
