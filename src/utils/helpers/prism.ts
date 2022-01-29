import { IntlShape } from 'react-intl';

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

/**
 * Translate the PrismJS Copy to clipboard button.
 */
export const translateCopyButton = (locale: string, intl: IntlShape) => {
  const articles = document.getElementsByTagName('article');
  const copyText = intl.formatMessage({
    defaultMessage: 'Copy',
    description: 'Prism: copy button text (no clicked)',
  });
  const copiedText = intl.formatMessage({
    defaultMessage: 'Copied!',
    description: 'Prism: copy button text (clicked)',
  });
  const errorText = intl.formatMessage({
    defaultMessage: 'Use Ctrl+c to copy',
    description: 'Prism: error text',
  });

  Array.from(articles).forEach((article) => {
    article.setAttribute('lang', locale);
    article.setAttribute('data-prismjs-copy', copyText);
    article.setAttribute('data-prismjs-copy-success', copiedText);
    article.setAttribute('data-prismjs-copy-error', errorText);
  });
};
