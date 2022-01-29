import { config } from '@config/website';
import { createIntl, createIntlCache, IntlShape } from '@formatjs/intl';
import { readFile } from 'fs/promises';
import path from 'path';

type Messages = { [key: string]: string };

export const defaultLocale = config.locales.defaultLocale;

/**
 * Load the translation for the provided locale.
 *
 * @param currentLocale - The current locale.
 * @returns {Promise<Messages>} The translated strings.
 */
export async function loadTranslation(
  currentLocale: string | undefined
): Promise<Messages> {
  const locale: string = currentLocale || defaultLocale;

  const languagePath = path.join(process.cwd(), `lang/${locale}.json`);

  try {
    const contents = await readFile(languagePath, 'utf8');
    return JSON.parse(contents);
  } catch (error) {
    console.error(
      'Error: Could not load compiled language files. Please run `yarn run i18n:compile` first."'
    );
    throw error;
  }
}

/**
 * Create an Intl object to be used outside components.
 *
 * @returns {<Promise<IntlShape<string>>} The Intl object.
 */
export async function getIntlInstance(): Promise<IntlShape<string>> {
  try {
    const cache = createIntlCache();
    const messages = await loadTranslation(defaultLocale);

    return createIntl({ locale: defaultLocale, messages }, cache);
  } catch (error) {
    console.error('Error: Could not create an Intl instance.');
    throw error;
  }
}
