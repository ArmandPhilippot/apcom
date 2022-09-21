import { slugify } from '@utils/helpers/strings';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutationObserver } from './use-mutation-observer';

export type Heading = {
  /**
   * The heading depth.
   */
  depth: number;
  /**
   * The heading id.
   */
  id: string;
  /**
   * The heading children.
   */
  children: Heading[];
  /**
   * The heading title.
   */
  title: string;
};

/**
 * Get the headings tree of the given HTML element.
 *
 * @param {HTMLElement} wrapper - An HTML element that contains the headings.
 * @returns {Heading[]} The headings tree.
 */
const useHeadingsTree = (wrapper: HTMLElement): Heading[] => {
  const depths = useMemo(() => ['h2', 'h3', 'h4', 'h5', 'h6'], []);
  const [allHeadings, setAllHeadings] =
    useState<NodeListOf<HTMLHeadingElement>>();
  const [headingsTree, setHeadingsTree] = useState<Heading[]>([]);

  const getHeadingsInWrapper = useCallback(() => {
    const query = depths.join(', ');
    const result: NodeListOf<HTMLHeadingElement> =
      wrapper.querySelectorAll(query);
    setAllHeadings(result);
  }, [depths, wrapper]);

  useEffect(() => {
    getHeadingsInWrapper();
  }, [getHeadingsInWrapper]);

  useMutationObserver({
    callback: getHeadingsInWrapper,
    options: { childList: true },
    nodeOrSelector: wrapper,
  });

  const getDepth = useCallback(
    /**
     * Retrieve the heading element depth.
     *
     * @param {HTMLHeadingElement} el - An heading element.
     * @returns {number} The heading depth.
     */
    (el: HTMLHeadingElement): number => {
      return depths.findIndex((depth) => depth === el.localName);
    },
    [depths]
  );

  const formatHeadings = useCallback(
    /**
     * Convert a list of headings into an array of Heading objects.
     *
     * @param {NodeListOf<HTMLHeadingElement>} headings - A list of headings.
     * @returns {Heading[]} An array of Heading objects.
     */
    (headings: NodeListOf<HTMLHeadingElement>): Heading[] => {
      const formattedHeadings: Heading[] = [];

      Array.from(headings).forEach((heading) => {
        const title: string = heading.textContent!;
        const id = slugify(title);
        const depth = getDepth(heading);
        const children: Heading[] = [];

        heading.id = id;

        formattedHeadings.push({
          depth,
          id,
          children,
          title,
        });
      });

      return formattedHeadings;
    },
    [getDepth]
  );

  const buildSubTree = useCallback(
    /**
     * Build the heading subtree.
     *
     * @param {Heading} parent - The heading parent.
     * @param {Heading} currentHeading - The current heading element.
     */
    (parent: Heading, currentHeading: Heading): void => {
      if (parent.depth === currentHeading.depth - 1) {
        parent.children.push(currentHeading);
      } else {
        const lastItem = parent.children[parent.children.length - 1];
        buildSubTree(lastItem, currentHeading);
      }
    },
    []
  );

  const buildTree = useCallback(
    /**
     * Build a heading tree.
     *
     * @param {Heading[]} headings - An array of Heading objects.
     * @returns {Heading[]} The headings tree.
     */
    (headings: Heading[]): Heading[] => {
      const tree: Heading[] = [];

      headings.forEach((heading) => {
        if (heading.depth === 0) {
          tree.push(heading);
        } else {
          const lastItem = tree[tree.length - 1];
          buildSubTree(lastItem, heading);
        }
      });

      return tree;
    },
    [buildSubTree]
  );

  const getHeadingsTree = useCallback(
    /**
     * Retrieve a headings tree from a list of headings element.
     *
     * @param {NodeListOf<HTMLHeadingElement>} headings - A headings list.
     * @returns {Heading[]} The headings tree.
     */
    (headings: NodeListOf<HTMLHeadingElement>): Heading[] => {
      const formattedHeadings = formatHeadings(headings);

      return buildTree(formattedHeadings);
    },
    [formatHeadings, buildTree]
  );

  useEffect(() => {
    if (allHeadings) {
      const headingsList = getHeadingsTree(allHeadings);
      setHeadingsTree(headingsList);
    }
  }, [allHeadings, getHeadingsTree]);

  return headingsTree;
};

export default useHeadingsTree;
