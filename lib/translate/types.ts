import type {i18nConfig} from 'config/i18n';
import type {locales} from 'constants/constants';

export type Locale = Custom.ValueOf<typeof locales>;

export type Pages = Custom.ValueOf<(typeof i18nConfig)['pages']>;

export type AnyNamespaceKey = Custom.ValueOf<Pages>;
