import {isObject, keyIn, isString} from '@/common/utils/utils';
import {i18nConfig} from '@root/i18n';

import type {ParsedUrlQuery} from 'querystring';

export const getLocale = (parsedUrlQuery: ParsedUrlQuery) => {
  if (
    isObject(parsedUrlQuery) &&
    keyIn(parsedUrlQuery, 'locale') &&
    isString(parsedUrlQuery.locale)
  ) {
    return parsedUrlQuery.locale;
  }

  return i18nConfig.defaultLocale;
};

export const useLocale = () => {};
