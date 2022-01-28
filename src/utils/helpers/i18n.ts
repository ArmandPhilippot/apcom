import { messages as messagesEn } from '@i18n/en/messages.js';
import { messages as messagesFr } from '@i18n/fr/messages.js';
import { i18n, Messages } from '@lingui/core';
import { en, fr } from 'make-plural/plurals';

type Catalog = {
  messages: Messages;
};

export const locales = {
  en: 'English',
  fr: 'Français',
};

export const defaultLocale = 'fr';

/**
 * Load the translation with the correct method depending on environment.
 *
 * @param {string} locale - The current locale.
 * @returns {Promise<Messages>} The translated messages.
 */
export async function loadTranslation(locale: string): Promise<Messages> {
  let catalog: Catalog;

  try {
    if (process.env.NODE_ENV === 'production') {
      catalog = await import(`src/i18n/${locale}/messages`);
    } else {
      catalog = await import(`@lingui/loader!src/i18n/${locale}/messages.po`);
    }

    return catalog.messages;
  } catch (error) {
    console.error('Error while loading translation.');
    throw error;
  }
}

/**
 * Init lingui.
 *
 * @param {string} locale - The locale to activate.
 * @param {Messages} [messages] - The compiled translation.
 */
export function initLingui(locale: string, messages?: Messages) {
  try {
    i18n.loadLocaleData({
      en: { plurals: en },
      fr: { plurals: fr },
    });

    if (messages) {
      i18n.load(locale, messages);
    } else {
      i18n.load({
        en: messagesEn,
        fr: messagesFr,
      });
    }

    i18n.activate(locale, Object.keys(locales));
  } catch (error) {
    console.error('Error while Lingui init.');
    throw error;
  }
}

/**
 * Activate the given locale.
 *
 * @param {string} locale - The locale to activate.
 * @param {Messages} messages - The compiled translation.
 */
export function activateLocale(currentLocale: string, messages: Messages) {
  const locale: string = Object.keys(locales).includes(currentLocale)
    ? currentLocale
    : defaultLocale;

  try {
    initLingui(locale, messages);
  } catch (error) {
    console.error(`Error while activating ${currentLocale}`);
    throw error;
  }
}
