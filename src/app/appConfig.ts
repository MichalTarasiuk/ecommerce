import invariant from 'invariant';

const hostname = process.env['NEXT_PUBLIC_HOSTNAME'];
invariant(hostname, `process.env['NEXT_PUBLIC_HOSTNAME'] is not defined`);

const apiUrl = process.env['NEXT_PUBLIC_SALEOR_API_URL'];
invariant(apiUrl, `process.env['NEXT_PUBLIC_SALEOR_API_URL'] is not defined`);

export const appConfig = {
  root: '__next',
  hostname,
  apiUrl,
};
