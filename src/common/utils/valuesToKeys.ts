import {entries} from './entries';
import {fromEntries} from './fromEntries';

export const valuesToKeys = <AnyObject extends Record<PropertyKey, unknown>>(
  anyObject: AnyObject,
) => fromEntries(entries(anyObject).map((entry) => [entry[0], entry[0]]));
