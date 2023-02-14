import {objectKeys} from '@/common/utils/objectKeys';

export const fieldValues = {
  email: 'email',
  password: 'password',
} as const;

export const isFieldValue = (name: string): name is keyof typeof fieldValues =>
  objectKeys(fieldValues).some((fieldValue) => fieldValue === name);
