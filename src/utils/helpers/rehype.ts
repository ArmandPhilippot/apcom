/**
 * Update a stringified HTML tree using unified plugins.
 *
 * It will parse the provided content to add id to each headings.
 *
 * @param {string} content - The page contents.
 * @returns {string} The updated page contents.
 */
export const updateContentTree = async (content: string): Promise<string> => {
  const { unified } = await import('unified');
  const rehypeParse = (await import('rehype-parse')).default;
  const rehypeSlug = (await import('rehype-slug')).default;
  const rehypeStringify = (await import('rehype-stringify')).default;

  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSlug)
    .use(rehypeStringify)
    .processSync(content)
    .toString();
};
