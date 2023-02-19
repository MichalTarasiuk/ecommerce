export type FieldsNames = typeof fieldNames;
export type FieldsValues = Record<keyof FieldsNames, string>;

export const fieldNames = {
  email: 'email',
} as const;
