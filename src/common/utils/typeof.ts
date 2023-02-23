/* eslint-disable functional/prefer-readonly-type -- just ignore */
import type {FunctionType, ArrayType} from '@/common/types/types';

const inferType = (operand: unknown, exact = false) => {
  const type = typeof operand;

  if (type !== 'object' && !exact) {
    return type;
  }

  const exactType = Object.prototype.toString
    .call(operand)
    .replace(/^\[object (\S+)\]$/, '$1');

  return exactType.toLowerCase();
};

export const isSet = (operand: unknown): operand is Set<unknown> =>
  inferType(operand, true) === 'set';

export const isObject = (
  operand: unknown,
): operand is Record<PropertyKey, unknown> =>
  inferType(operand, true) === 'object';

export const isString = (operand: unknown): operand is string =>
  inferType(operand) === 'string';

export const isFunction = (operand: unknown): operand is FunctionType.Any =>
  inferType(operand) === 'function';

export const isRegExp = (operand: unknown): operand is RegExp =>
  inferType(operand, true) === 'regexp';

export const isArray = (operand: unknown): operand is ArrayType.Any =>
  inferType(operand, true) === 'array';

export const isError = (operand: unknown): operand is Error =>
  operand instanceof Error;

export const isUndefined = (operand: unknown): operand is undefined =>
  inferType(operand) === 'undefined';
