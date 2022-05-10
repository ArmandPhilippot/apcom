/**
 * Convert a text into a slug or id.
 * https://gist.github.com/codeguy/6684588#gistcomment-3332719
 *
 * @param {string} text - A text to slugify.
 * @returns {string} The slug.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '-')
    .replace(/\-\-+/g, '-')
    .replace(/(^-)|(-$)/g, '');
};

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} text - A text to capitalize.
 * @returns {string} The capitalized text.
 */
export const capitalize = (text: string): string => {
  return text.replace(/^\w/, (firstLetter) => firstLetter.toUpperCase());
};
