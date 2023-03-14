import {isProduction} from './nodeEnvironment';

export const logErrorInDev = (message: string) => {
  if (isProduction()) {
    console.error(message);
  }
};
