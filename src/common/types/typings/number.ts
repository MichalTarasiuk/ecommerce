export type ToString<Value> = Value extends number ? `${Value}` : Value;
