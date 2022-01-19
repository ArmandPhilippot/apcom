import { config } from '@config/website';
import type { I18n } from '@lingui/core';
import { en, fr } from 'make-plural/plurals';

export interface LocaleData {
  messages: object;
  default: object;
}

export const locales = {
  en: 'English',
  fr: 'Français',
};

export const defaultLocale = config.locales.defaultLocale;

export function initTranslation(i18n: I18n): void {
  i18n.loadLocaleData({
    en: { plurals: en },
    fr: { plurals: fr },
  });
}

export async function loadTranslation(
  locale: string,
  isProduction: boolean = true
) {
  let data: LocaleData;
  if (isProduction) {
    data = await import(`src/i18n/${locale}/messages`);
  } else {
    data = await import(`@lingui/loader!src/i18n/${locale}/messages.po`);
  }

  return data.messages;
}
