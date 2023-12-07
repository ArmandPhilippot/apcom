import { useState, useCallback, type RefCallback, useEffect } from 'react';
import type { HeadingLevel } from '../../../components';
import type { Nullable } from '../../../types';
import { useMutationObserver } from '../use-mutation-observer';

export type HeadingsTreeNode = {
  /**
   * The heading children.
   */
  children: HeadingsTreeNode[];
  /**
   * The heading depth.
   */
  depth: number;
  /**
   * The heading id.
   */
  id: string;
  /**
   * The heading label.
   */
  label: string;
};

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

type HeadingTagNames = (typeof headingTags)[number];

export type UseHeadingsTreeOptions = {
  /**
   * Look for headings starting from this level (1 = `h1`, ...).
   *
   * @default undefined
   */
  fromLevel?: HeadingLevel;
  /**
   * Look for headings ending with this level (1 = `h1`, ...).
   *
   * @default undefined
   */
  toLevel?: HeadingLevel;
};

/**
 * Retrieve a list of heading tags.
 *
 * @param {UseHeadingsTreeOptions} options - An options object.
 * @returns {HeadingTagNames[]} The heading tags list.
 */
const getHeadingTagsList = (
  options?: UseHeadingsTreeOptions
): HeadingTagNames[] => {
  const tagsList = headingTags.slice(0);

  if (options?.toLevel) tagsList.length = options.toLevel;
  if (options?.fromLevel) tagsList.splice(0, options.fromLevel - 1);

  return tagsList;
};

type HeadingsTreeNodeWithParentIndex = HeadingsTreeNode & {
  parentIndex: number;
};

/**
 * Convert a node list of heading elements to an array of indexed nodes.
 *
 * @param {NodeListOf<HTMLHeadingElement>} nodes - The heading elements list.
 * @returns {HeadingsTreeNodeWithParentIndex[]} The headings nodes.
 */
const getHeadingNodesFrom = (
  nodes: NodeListOf<HTMLHeadingElement>
): HeadingsTreeNodeWithParentIndex[] => {
  const depthLastIndexes = Array.from({ length: headingTags.length }, () => -1);

  return Array.from(nodes).map(
    (node, index): HeadingsTreeNodeWithParentIndex => {
      const depth = headingTags.findIndex((tag) => tag === node.localName);
      const parentDepthIndexes = depthLastIndexes.slice(0, depth);

      depthLastIndexes[depth] = index;

      return {
        children: [],
        depth,
        id: node.id,
        label: node.textContent ?? '',
        parentIndex: Math.max(...parentDepthIndexes),
      };
    }
  );
};

/**
 * Build an headings tree from a list of heading elements.
 *
 * @param {NodeListOf<HTMLHeadingElement>} nodes - The heading nodes.
 * @returns {HeadingsTreeNode[]} The headings tree.
 */
const buildHeadingsTreeFrom = (
  nodes: NodeListOf<HTMLHeadingElement>
): HeadingsTreeNode[] => {
  const headings = getHeadingNodesFrom(nodes);
  const treeNodes: HeadingsTreeNode[] = [];

  for (const heading of headings) {
    const { parentIndex, ...node } = heading;

    if (parentIndex >= 0) headings[parentIndex].children.push(node);
    else treeNodes.push(node);
  }

  return treeNodes;
};

export type UseHeadingsTreeReturn<T extends HTMLElement> = {
  /**
   * A callback function to set a ref.
   */
  ref: RefCallback<T>;
  /**
   * The headings tree.
   */
  tree: HeadingsTreeNode[];
};

/**
 * React hook to retrieve the headings tree in a document or in a given wrapper.
 *
 * @param {UseHeadingsTreeOptions} options - The headings tree config.
 * @returns {UseHeadingsTreeReturn<T>} The headings tree and a ref callback.
 */
export const useHeadingsTree = <T extends HTMLElement = HTMLElement>(
  options?: UseHeadingsTreeOptions
): UseHeadingsTreeReturn<T> => {
  if (
    options?.fromLevel &&
    options.toLevel &&
    options.fromLevel > options.toLevel
  )
    throw new Error(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );

  const [headings, setHeadings] = useState<NodeListOf<HTMLHeadingElement>>();
  const requestedHeadingTags = getHeadingTagsList(options);
  const query = requestedHeadingTags.join(', ');

  /*
   * With a mutable ref, the headings are not always updated because of loading
   * states. So we need to use a RefCallback to detect when the component is
   * effectively rendered. However, to be able to compare the mutation records,
   * we need to keep track of the current ref so we also need to use useState...
   */
  const [wrapper, setWrapper] = useState<Nullable<T>>();
  const ref: RefCallback<T> = useCallback((el) => {
    setWrapper(el);
  }, []);

  const updateHeadings = useCallback(() => {
    const headingNodes = wrapper?.querySelectorAll<HTMLHeadingElement>(query);

    if (headingNodes) setHeadings(headingNodes);
  }, [query, wrapper]);

  useEffect(() => {
    if (wrapper) updateHeadings();
  }, [updateHeadings, wrapper]);

  useMutationObserver({
    callback: useCallback(
      (records) => {
        for (const record of records) {
          if (record.target === wrapper) updateHeadings();
        }
      },
      [updateHeadings, wrapper]
    ),
    options: { childList: true, subtree: true },
    ref: { current: typeof window === 'undefined' ? null : document.body },
  });

  return { ref, tree: headings ? buildHeadingsTreeFrom(headings) : [] };
};
