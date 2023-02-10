import {fromEntries, entries} from '@/common/utils/utils';

import type {GetSteps} from '../StepperContext';

const generateTokens = <Store extends Record<PropertyKey, unknown>>(
  steps: GetSteps<Store>,
) => fromEntries(entries(steps).map(([key]) => [key, Symbol()]));

export const tokenize = <Store extends Record<PropertyKey, unknown>>(
  steps: GetSteps<Store>,
) => {
  const tokens = generateTokens(steps);

  return {
    tokenizedSteps: fromEntries(
      entries(steps).map(([stepKey, {assert: assertImpl, ...step}]) => {
        const assert = (...params: Parameters<typeof assertImpl>) => {
          // @ts-ignore
          const assertResult = assertImpl(...params);
          const token = tokens[stepKey];

          if (assertResult && token) {
            const value = params.length === 1 ? params[0] : params;

            return {token, value};
          }

          return undefined;
        };

        const nextStep = {...step, assert};

        return [stepKey, nextStep];
      }),
    ),
    tokens,
  };
};
