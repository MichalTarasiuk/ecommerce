import {fromEntries, entries} from '@/common/utils/utils';

import type {GetSteps} from '../stepperContext';

const getFirst = (array: ReadonlyArray<unknown>) =>
  array.length === 1 ? array[0] : array;

const generateTokens = <Store extends Record<PropertyKey, unknown>>(
  steps: GetSteps<Store>,
) => fromEntries(entries(steps).map(([key]) => [key, Symbol()]));

export const tokenize = <Store extends Record<PropertyKey, unknown>>(
  steps: GetSteps<Store>,
) => {
  const tokens = generateTokens(steps);
  const tokenizedSteps = fromEntries(
    entries(steps).map(([stepKey, {assert: assertImpl, ...restStep}]) => {
      type Params = Parameters<typeof assertImpl>;
      const assert = (...params: Params) => {
        // hard to infer @TODO later
        // @ts-ignore
        const assertResult = assertImpl(...params);
        const token = tokens[stepKey];

        if (assertResult && token) {
          const value = getFirst(params);

          return {token, value};
        }

        return undefined;
      };

      const nextStep = {...restStep, assert};

      return [stepKey, nextStep];
    }),
  );

  return {
    tokenizedSteps,
    tokens,
  };
};
