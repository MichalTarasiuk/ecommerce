declare namespace NumberType {
  type ToString<Value> = Value extends number ? `${Value}` : Value;
}
