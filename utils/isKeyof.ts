import {objectKeys} from './objectKeys';

export const isKeyof = <AnyObject extends Record<PropertyKey, unknown>>(
  anyObject: AnyObject,
  key: PropertyKey,
): key is keyof AnyObject => {
  const anyObjectKeys: readonly PropertyKey[] = objectKeys(anyObject);

  return anyObjectKeys.includes(key);
};
