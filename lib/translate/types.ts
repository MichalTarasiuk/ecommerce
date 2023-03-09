import type {i18nConfig} from 'config/i18n';

export type Locale = Custom.ValueOf<(typeof i18nConfig)['locales']>;
