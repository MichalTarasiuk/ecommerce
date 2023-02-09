import type {Any as AnyArray} from './array';

export type ValueOf<Value extends AnyArray | Record<PropertyKey, unknown>> =
  Value extends AnyArray ? Value[number] : Value[keyof Value];

export type ReadonlyAll<Value> =
  | Readonly<Value>
  | (Value extends (...params: infer Params) => infer ReturnType
      ? (...params: Params) => Readonly<ReturnType>
      : never);
