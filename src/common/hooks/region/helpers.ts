import {isObject, keyIn, isString} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {ParsedUrlQuery} from 'querystring';

const defaultChannelName = 'default-channel';

export const getChannel = (parsedUrlQuery: ParsedUrlQuery) => {
  if (
    isObject(parsedUrlQuery) &&
    keyIn(parsedUrlQuery, 'channel') &&
    isString(parsedUrlQuery.channel)
  ) {
    return parsedUrlQuery.channel;
  }

  return defaultChannelName;
};

export const getLocaleName = (parsedUrlQuery: ParsedUrlQuery) => {
  if (
    isObject(parsedUrlQuery) &&
    keyIn(parsedUrlQuery, 'locale') &&
    isString(parsedUrlQuery.locale)
  ) {
    return parsedUrlQuery.locale;
  }

  return i18nConfig.defaultLocale;
};
