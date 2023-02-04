/* eslint-disable functional/prefer-readonly-type -- just ignore */

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

export const isNumber = (operand: unknown): operand is number =>
  inferType(operand) === 'number';
