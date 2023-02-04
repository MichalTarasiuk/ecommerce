export const max = <Collector extends number, Value extends number>(
  collector: Collector,
  value: Value,
): Collector | Value => {
  return value > collector ? value : collector;
};

export const min = <Collector extends number, Value extends number>(
  collector: Collector,
  value: Value,
): Collector | Value => {
  return value < collector ? value : collector;
};
