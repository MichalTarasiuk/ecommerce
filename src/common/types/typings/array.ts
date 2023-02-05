import type {Equals} from './custom';

// eslint-disable-next-line functional/prefer-readonly-type -- union of array variants
export type Any = Array<unknown> | ReadonlyArray<unknown>;

export type Tail<Arr extends Any> = Arr extends readonly [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;

export type Every<AnyArray extends Any, Value> = AnyArray extends readonly [
  infer First,
  ...infer Rest,
]
  ? Equals<First, Value> extends 1
    ? Rest extends readonly never[]
      ? true
      : Every<Rest, Value>
    : false
  : false;
