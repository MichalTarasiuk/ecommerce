export const defaultChannel = 'default-channel';

export const localesObject = {
  english: 'en-US',
  polish: 'pl-PL',
} as const;
export const locales = Object.values(localesObject);
export const defaultLocale = localesObject.english;

export const defaultRegion = {
  locale: defaultLocale,
  channel: defaultChannel,
};
