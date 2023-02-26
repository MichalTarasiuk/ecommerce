/* eslint-disable @typescript-eslint/consistent-type-assertions -- narrow type down */
import {isFunction} from './typeof';

export type Resolvable<
  Resolved,
  Params extends readonly unknown[] = readonly never[],
> = Resolved | ((...params: Params) => Resolved);

const isResolvable = <Resolved, Params extends readonly unknown[]>(
  value: unknown,
): value is Extract<Resolvable<Resolved, Params>, FunctionType.Any> =>
  isFunction(value);

export const resolve = <Resolved, Params extends readonly unknown[]>(
  resolvable: Resolvable<Resolved, Params>,
  ...params: Params
) => {
  if (isResolvable(resolvable)) {
    return resolvable(...params) as Resolved;
  }

  return resolvable as Resolved;
};
