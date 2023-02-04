import {fromEntries, entries} from '@/common/utils/utils';

import type {Steps} from '../stepperContext';

const getFirst = (array: ReadonlyArray<unknown>) =>
  array.length === 1 ? array[0] : array;

const generateTokens = <Store extends Record<PropertyKey, unknown>>(
  steps: Steps<Store>,
) => fromEntries(entries(steps).map(([key]) => [key, Symbol()]));

export const tokenize = <Store extends Record<PropertyKey, unknown>>(
  steps: Steps<Store>,
) => {
  const tokens = generateTokens(steps);
  const tokenizedSteps = fromEntries(
    entries(steps).map(([stepKey, step]) => {
      const assert = (...params: Parameters<(typeof step)['assert']>) => {
        // @ts-ignore
        const assertResult = step.assert(...params);
        const token = tokens[stepKey];

        if (assertResult && token) {
          const value = getFirst(params);

          return {token, value};
        }

        return undefined;
      };

      const nextStep = {...step, assert};

      return [stepKey, nextStep];
    }),
  );

  return {
    tokenizedSteps,
    tokens,
  };
};
