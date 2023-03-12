declare namespace StringType {
  type ToNumber<Value> = Value extends `${infer Number extends number}`
    ? Number
    : Value;

  type ReplaceAll<
    Value extends string,
    From extends string,
    To extends string,
  > = Value extends `${infer Left}${From extends ''
    ? never
    : From}${infer Right}`
    ? `${Left}${To}${ReplaceAll<Right, From, To>}`
    : Value;

  type Replace<
    Value extends string,
    From extends string,
    To extends string,
  > = Value extends `${infer Left}${From extends ''
    ? never
    : From}${infer Right}`
    ? `${Left}${To}${Right}`
    : Value;
}
