import {isString} from './typeof';

export const parseJSON = (value: unknown) => {
  try {
    if (isString(value)) {
      const parsed: unknown = JSON.parse(value);

      return parsed;
    }
  } catch (error) {
    return null;
  }

  return null;
};

export const toJSON = (value: unknown) => {
  try {
    const json = JSON.stringify(value);

    return json;
  } catch (error) {
    return null;
  }
};
