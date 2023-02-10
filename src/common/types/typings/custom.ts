import type {Every, Any as AnyArray} from './array';

export type Equals<A1, B2> = (<A>() => A extends B2 ? 1 : 0) extends <
  A,
>() => A extends A1 ? 1 : 0
  ? 1
  : 0;

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

export type And<Union> = Every<UnionToTuple<Union>, true>;

export type ReadonlyAll<Value> =
  | Readonly<Value>
  | (Value extends (...params: infer Params) => infer ReturnType
      ? (...params: Params) => Readonly<ReturnType>
      : never);

export type ValueOf<Value extends AnyArray | Record<PropertyKey, unknown>> =
  Value extends AnyArray ? Value[number] : Value[keyof Value];
