// eslint-disable-next-line functional/prefer-readonly-type -- union of array variants
export type AnyArray = Array<unknown> | ReadonlyArray<unknown>;

export type Tail<Arr extends AnyArray> = Arr extends readonly [
  unknown,
  ...infer Rest,
]
  ? Rest
  : never;

export type ObjectKeyPaths<Value> = Value extends Record<string, unknown>
  ? {
      readonly [Key in keyof Value]: Value[Key] extends Record<string, unknown>
        ? Key | `${Key & string}.${ObjectKeyPaths<Value[Key]>}`
        : Key;
    }[keyof Value]
  : never;

export type Debug<AnyObject> = AnyObject extends Record<PropertyKey, unknown>
  ? {readonly [Key in keyof AnyObject]: AnyObject[Key]}
  : never;

export type Equals<A1, B2> = (<A>() => A extends B2 ? 1 : 0) extends <
  A,
>() => A extends A1 ? 1 : 0
  ? 1
  : 0;

export type UnknownFunction = (...args: readonly unknown[]) => unknown;

export type ValueOf<Value extends AnyArray | Record<PropertyKey, unknown>> =
  Value extends AnyArray ? Value[number] : Value[keyof Value];

export type AnyFunction<
  Args extends readonly any[] = readonly any[],
  ReturnType = unknown,
> = (...args: Args) => ReturnType;

type UnionToIntersectionFn<Union> = (
  Union extends Union ? (union: () => Union) => void : never
) extends (intersection: infer Intersection) => void
  ? Intersection
  : never;

export type LastUnion<Union> =
  UnionToIntersectionFn<Union> extends () => infer Last ? Last : never;

export type UnionToTuple<
  Union,
  Result extends ReadonlyArray<unknown> = readonly [],
> = readonly Union[] extends readonly never[]
  ? Result
  : UnionToTuple<
      Exclude<Union, LastUnion<Union>>,
      readonly [LastUnion<Union>, ...Result]
    >;

export type Some<Arr extends AnyArray, Value> = Arr extends readonly [
  infer First,
  ...infer Rest,
]
  ? First extends Value
    ? true
    : Some<Rest, Value>
  : false;
