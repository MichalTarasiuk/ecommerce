import {appConfig} from '@/app/appConfig';

import type {GetServerSidePropsContext} from 'next';

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

  return getHostname(referer) === appConfig.hostname;
};
