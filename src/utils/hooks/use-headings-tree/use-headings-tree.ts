import { useEffect, useState, type RefObject } from 'react';
import type { HeadingLevel } from '../../../components';

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

/**
 * React hook to retrieve the headings tree in a document or in a given wrapper.
 *
 * @param {RefObject<T>} ref - A ref to the element where to look for headings.
 * @param {UseHeadingsTreeOptions} options - The headings tree config.
 * @returns {HeadingsTreeNode[]} The headings tree.
 */
export const useHeadingsTree = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options?: UseHeadingsTreeOptions
): HeadingsTreeNode[] => {
  if (
    options?.fromLevel &&
    options.toLevel &&
    options.fromLevel > options.toLevel
  )
    throw new Error(
      'Invalid options: `fromLevel` must be lower or equal to `toLevel`.'
    );

  const [tree, setTree] = useState<HeadingsTreeNode[]>([]);
  const requestedHeadingTags = getHeadingTagsList(options);
  const query = requestedHeadingTags.join(', ');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const headingNodes =
      ref.current?.querySelectorAll<HTMLHeadingElement>(query);

    if (headingNodes) setTree(buildHeadingsTreeFrom(headingNodes));
  }, [query, ref]);

  return tree;
};
