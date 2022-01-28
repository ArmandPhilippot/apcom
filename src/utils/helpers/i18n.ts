import { config } from '@config/website';
import { readFile } from 'fs/promises';
import path from 'path';

type Messages = { [key: string]: string };

/**
 * Load the translation for the provided locale.
 * @param currentLocale - The current locale.
 * @returns {Promise<Messages>} The translated strings.
 */
export async function loadTranslation(
  currentLocale: string | undefined
): Promise<Messages> {
  const locale: string = currentLocale || config.locales.defaultLocale;

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
