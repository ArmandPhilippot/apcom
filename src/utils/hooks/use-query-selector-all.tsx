import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Use `document.querySelectorAll`.
 *
 * @param {string} query - A query.
 * @returns {NodeListOf<HTMLElementTagNameMap[T]|undefined>} - The node list.
 */
export const useQuerySelectorAll = <T extends keyof HTMLElementTagNameMap>(
  query: string
): NodeListOf<HTMLElementTagNameMap[T]> | undefined => {
  const [elements, setElements] =
    useState<NodeListOf<HTMLElementTagNameMap[T]>>();
  const { asPath } = useRouter();

  useEffect(() => {
    setElements(document.querySelectorAll(query));
  }, [asPath, query]);

  return elements;
};
