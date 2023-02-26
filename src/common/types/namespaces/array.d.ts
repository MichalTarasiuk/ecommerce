declare namespace ArrayType {
  // eslint-disable-next-line functional/prefer-readonly-type -- union of array variants
  type Any = Array<unknown> | ReadonlyArray<unknown>;

  type Tail<Arr extends Any> = Arr extends readonly [unknown, ...infer Rest]
    ? Rest
    : never;

  type Every<AnyArray extends Any, Value> = AnyArray extends readonly [
    infer First,
    ...infer Rest,
  ]
    ? Custom.Equals<First, Value> extends 1
      ? Rest extends readonly never[]
        ? true
        : Every<Rest, Value>
      : false
    : false;

  type ToReadonly<Arr extends Any> = ReadonlyArray<Arr[number]>;
}
