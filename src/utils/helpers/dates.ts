import { Dates } from '@ts/types/app';
import { settings } from '@utils/config';

/**
 * Format a date based on a locale.
 *
 * @param {string} date - The date.
 * @param {string} [locale] - A locale.
 * @returns {string} The locale date string.
 */
export const getFormattedDate = (
  date: string,
  locale: string = settings.locales.defaultLocale
): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return new Date(date).toLocaleDateString(locale, dateOptions);
};

/**
 * Format a time based on a locale.
 *
 * @param {string} time - The time.
 * @param {string} [locale] - A locale.
 * @returns {string} The locale time string.
 */
export const getFormattedTime = (
  time: string,
  locale: string = settings.locales.defaultLocale
): string => {
  const formattedTime = new Date(time).toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  });

  return locale === 'fr' ? formattedTime.replace(':', 'h') : formattedTime;
};

/**
 * Retrieve a Dates object.
 *
 * @param publication - The publication date.
 * @param update - The update date.
 * @returns {Dates} A Dates object.
 */
export const getDates = (publication: string, update: string): Dates => {
  return {
    publication: getFormattedDate(publication),
    update: getFormattedDate(update),
  };
};
