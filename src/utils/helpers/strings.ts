/**
 * Convert a text into a slug or id.
 * https://gist.github.com/codeguy/6684588#gistcomment-3332719
 *
 * @param {string} text - A text to slugify.
 * @returns {string} The slug.
 */
export const slugify = (text: string): string =>
  text
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/(?:^-)|(?:-$)/g, '');

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} text - A text to capitalize.
 * @returns {string} The capitalized text.
 */
export const capitalize = <T extends string>(text: T): Capitalize<T> =>
  text.replace(/^\w/, (firstLetter) =>
    firstLetter.toUpperCase()
  ) as Capitalize<T>;

/**
 * Convert a text from kebab case (foo-bar) to camel case (fooBar).
 *
 * @param {string} text - A text to transform.
 * @returns {string} The text in camel case.
 */
export const fromKebabCaseToCamelCase = (text: string): string =>
  text.replace(/-./g, (x) => x[1].toUpperCase());

/**
 * Retrieve a valid data attribute from a string.
 *
 * @param {string} str - A string.
 * @returns {string} A data attribute (ie. `data-...`)
 */
export const getDataAttributeFrom = (str: string) => {
  if (str.startsWith('data-')) return str;
  return `data-${str}`;
};

/**
 * Remove the given character if present at the end of the given string.
 *
 * @param {string} str - A string to trim.
 * @param {string} char - The character to remove.
 * @returns {string} The trimmed string.
 */
export const trimTrailingChars = (str: string, char: string): string => {
  const regExp = new RegExp(`${char}+$`);

  return str.replace(regExp, '');
};

export const trimHTMLTags = (str: string) =>
  str.replace(/(?:<(?:[^>]+)>)/gi, '').replaceAll('\n\n\n\n', '\n\n');
