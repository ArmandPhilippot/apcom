import { Heading } from '@ts/types/app';
import { slugify } from '@utils/helpers/slugify';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useHeadingsTree = (wrapper: string) => {
  const router = useRouter();
  const depths = useMemo(() => ['h2', 'h3', 'h4', 'h5', 'h6'], []);
  const [allHeadings, setAllHeadings] =
    useState<NodeListOf<HTMLHeadingElement>>();

  useEffect(() => {
    const query = depths
      .map((depth) => `${wrapper} > *:not(aside) ${depth}`)
      .join(', ');
    const result: NodeListOf<HTMLHeadingElement> =
      document.querySelectorAll(query);
    setAllHeadings(result);
  }, [depths, wrapper, router.asPath]);

  const [headingsTree, setHeadingsTree] = useState<Heading[]>([]);

  const getElementDepth = useCallback(
    (el: HTMLHeadingElement) => {
      return depths.findIndex((depth) => depth === el.localName);
    },
    [depths]
  );

  const formatHeadings = useCallback(
    (headings: NodeListOf<HTMLHeadingElement>): Heading[] => {
      const formattedHeadings: Heading[] = [];

      Array.from(headings).forEach((heading) => {
        const title: string = heading.textContent!;
        const id = slugify(title);
        const depth = getElementDepth(heading);
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
    [getElementDepth]
  );

  const buildSubTree = useCallback(
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

  const getHeadingsList = useCallback(
    (headings: NodeListOf<HTMLHeadingElement>): Heading[] => {
      const formattedHeadings = formatHeadings(headings);

      return buildTree(formattedHeadings);
    },
    [formatHeadings, buildTree]
  );

  useEffect(() => {
    if (allHeadings) {
      const headingsList = getHeadingsList(allHeadings);
      setHeadingsTree(headingsList);
    }
  }, [allHeadings, getHeadingsList]);

  return headingsTree;
};

export default useHeadingsTree;
