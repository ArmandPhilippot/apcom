/**
 * Check if the current block has a defined language.
 * @param classList - A list of class.
 * @returns {boolean} - True if a class starts with "language-".
 */
const isLanguageBlock = (classList: DOMTokenList) => {
  const classes = Array.from(classList);
  return classes.some((className) => /language-.*/.test(className));
};

/**
 * Add automatically some classes and attributes for PrismJs.
 *
 * These classes and attributes are needed by Prism or to customize comments.
 */
export const addPrismClasses = () => {
  const preTags = document.getElementsByTagName('pre');

  Array.from(preTags).forEach((preTag) => {
    if (
      isLanguageBlock(preTag.classList) &&
      !preTag.classList.contains('command-line') &&
      !preTag.classList.contains('language-diff')
    ) {
      preTag.classList.add('line-numbers', 'match-braces');
    }

    if (
      preTag.classList.contains('command-line') &&
      preTag.classList.contains('filter-output')
    ) {
      preTag.setAttribute('data-filter-output', '#output#');
    }
  });
};
