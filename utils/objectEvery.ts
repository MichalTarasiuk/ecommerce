import {objectKeys} from './objectKeys';

export const objectEvery = <Type extends Record<PropertyKey, unknown>>(
  anyObject: Record<PropertyKey, unknown>,
  predicate: (value: unknown, key: string) => boolean,
): anyObject is Type =>
  objectKeys(anyObject).every((key) => predicate(anyObject[key], key));
