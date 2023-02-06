export type ToNumber<Value> = Value extends `${infer Number extends number}`
  ? Number
  : Value;
