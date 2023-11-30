import type Hast from 'hast';
import { classnames } from 'hast-util-classnames';
import rehypeParse from 'rehype-parse';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { unified, type Plugin as UnifiedPlugin } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Update a stringified HTML tree using unified plugins.
 *
 * It will parse the provided content to add id to each headings.
 *
 * @param {string} content - The page contents.
 * @returns {string} The updated page contents.
 */
export const updateContentTree = (content: string): string =>
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeStringify)
    .processSync(content)
    .toString();

const isSubStrIn = (substr: string | RegExp, str: string) => {
  if (typeof substr === 'string') return str.includes(substr);

  return substr.test(str);
};

const isNodeContainsClass = (
  node: Hast.Element,
  className: string | RegExp
) => {
  if (Array.isArray(node.properties.className)) {
    return node.properties.className.some(
      (singleClass) =>
        typeof singleClass === 'string' && isSubStrIn(className, singleClass)
    );
  }

  if (typeof node.properties.className === 'string')
    return isSubStrIn(className, node.properties.className);

  return false;
};

const rehypePrismClass: UnifiedPlugin<
  Record<'className', string>[],
  Hast.Root
> =
  ({ className }) =>
  (tree) => {
    const wpBlockClassName = 'wp-block-code';
    const lineNumbersClassName = className
      .replace('command-line', '')
      .replace(/\s\s+/g, ' ');
    const commandLineClassName = className
      .replace('line-numbers', '')
      .replace(/\s\s+/g, ' ');

    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'pre' &&
        isNodeContainsClass(node, wpBlockClassName)
      ) {
        if (isNodeContainsClass(node, 'language-bash')) {
          classnames(node, commandLineClassName);
          node.properties['data-filter-output'] = '#output#';
        } else if (isNodeContainsClass(node, /language-/)) {
          classnames(node, lineNumbersClassName);
        }
      }
    });
  };

/**
 * Update a stringified HTML tree using unified plugins.
 *
 * It will parse the provided content to update the classnames of WordPress
 * code blocks.
 *
 * @param {string} content - The page contents.
 * @param {string} className - The prism classNames.
 * @returns {string} The updated page contents.
 */
export const updateWordPressCodeBlocks = (
  content: string,
  className: string
): string =>
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypePrismClass, { className })
    .use(rehypeStringify)
    .processSync(content)
    .toString();
