declare namespace Custom {
  type Equals<A1, B2> = (<A>() => A extends B2 ? 1 : 0) extends <
    A,
  >() => A extends A1 ? 1 : 0
    ? 1
    : 0;

  type UnionToIntersectionFn<Union> = (
    Union extends Union ? (union: () => Union) => void : never
  ) extends (intersection: infer Intersection) => void
    ? Intersection
    : never;

  type LastUnion<Union> = UnionToIntersectionFn<Union> extends () => infer Last
    ? Last
    : never;

  type UnionToTuple<
    Union,
    Result extends ReadonlyArray<unknown> = readonly [],
  > = readonly Union[] extends readonly never[]
    ? Result
    : UnionToTuple<
        Exclude<Union, LastUnion<Union>>,
        readonly [LastUnion<Union>, ...Result]
      >;

  type And<Union> = ArrayType.Every<UnionToTuple<Union>, true>;

  type ReadonlyAll<Value> =
    | Readonly<Value>
    | (Value extends (...params: infer Params) => infer ReturnType
        ? (...params: Params) => Readonly<ReturnType>
        : never);

  type ValueOf<Value extends ArrayType.Any | Record<PropertyKey, unknown>> =
    Value extends ArrayType.Any ? Value[number] : Value[keyof Value];

  type MapOverUnion<
    Union extends PropertyKey,
    Mapper extends Record<PropertyKey, PropertyKey>,
  > = Union extends keyof Mapper ? Mapper[Union] : Union;
}
