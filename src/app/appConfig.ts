import {environment} from './environment';

const {NEXT_PUBLIC_HOSTNAME: hostname, NEXT_PUBLIC_SALEOR_API_URL: apiUrl} =
  environment;

export const appConfig = {
  root: '__next',
  hostname,
  apiUrl,
};
