import { slugify } from '@utils/helpers/slugify';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Heading = {
  depth: number;
  id: string;
  children: Heading[];
  title: string;
};

const useHeadingsTree = (wrapper: string) => {
  const [headingsTree, setHeadingsTree] = useState<Heading[]>([]);
  const depths = useMemo(() => ['h2', 'h3', 'h4', 'h5', 'h6'], []);

  const getElementDepth = useCallback(
    (el: HTMLHeadingElement) => {
      const elDepth = depths.findIndex((depth) => depth === el.localName);

      return elDepth;
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
      const headingsList = buildTree(formattedHeadings);

      return headingsList;
    },
    [formatHeadings, buildTree]
  );

  useEffect(() => {
    const query = depths.map((depth) => `${wrapper} ${depth}`).join(', ');
    const headings: NodeListOf<HTMLHeadingElement> =
      document.querySelectorAll(query);
    const headingsList = getHeadingsList(headings);
    setHeadingsTree(headingsList);
  }, [depths, wrapper, getHeadingsList]);

  return headingsTree;
};

export default useHeadingsTree;
