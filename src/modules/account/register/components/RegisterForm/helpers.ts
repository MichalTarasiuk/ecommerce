import {objectKeys} from '@/common/utils/objectKeys';

export type FieldsNames = typeof fieldNames;
export type FieldsValues = Record<keyof FieldsNames, string>;

export const fieldNames = {
  email: 'email',
  password: 'password',
} as const;

export const isFieldValue = (name: string): name is keyof FieldsNames =>
  objectKeys(fieldNames).some((fieldValue) => fieldValue === name);
