// eslint-disable-next-line functional/prefer-readonly-type -- union of array variants
export type Any = Array<unknown> | ReadonlyArray<unknown>;

export type Tail<Arr extends Any> = Arr extends readonly [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;

export type Some<Arr extends Any, Value> = Arr extends readonly [
  infer First,
  ...infer Rest,
]
  ? First extends Value
    ? true
    : Some<Rest, Value>
  : false;
