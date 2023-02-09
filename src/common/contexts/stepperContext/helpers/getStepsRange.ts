import {min, max, objectKeys} from '@/common/utils/utils';

import type {GetSteps, AnyStore} from '../StepperContext';

export const getStepsRange = <Store extends AnyStore>(
  steps: GetSteps<Store>,
) => {
  const keys = objectKeys(steps).map(Number);

  const range = {
    start: keys.reduce(min),
    end: keys.reduce(max),
  };

  const requiredKeys = Array.from(
    {length: range.end},
    (_, index) => index + range.start,
  );
  const hasAllRequiredKeys = requiredKeys.every((requiredKey) =>
    keys.includes(requiredKey),
  );

  if (!hasAllRequiredKeys) {
    throw Error(`range should be between ${range.start} and ${range.end}`);
  }

  return range;
};
