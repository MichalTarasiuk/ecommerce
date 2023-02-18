import invariant from 'invariant';

import type {GetServerSidePropsContext} from 'next';

const hostname = process.env['NEXT_PUBLIC_HOSTNAME'];

invariant(hostname, `process.env['NEXT_PUBLIC_HOSTNAME'] is not defined`);

const getHostname = (referer: string) => {
  try {
    const url = new URL(referer);

    return url.hostname;
  } catch (error) {
    return null;
  }
};

export const isNextLinkRequest = (
  request: GetServerSidePropsContext['req'],
) => {
  const referer = request.headers.referer;

  if (!referer) {
    return false;
  }

  return getHostname(referer) === hostname;
};
