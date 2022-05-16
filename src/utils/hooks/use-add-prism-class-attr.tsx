import { useCallback, useEffect, useState } from 'react';

export type AttributesMap = {
  [key: string]: string;
};

export type useAddPrismClassAttrProps = {
  attributes?: AttributesMap;
  classNames?: string;
};

/**
 * Add classnames and/or attributes to pre elements.
 *
 * @param props - An object of attributes and classnames.
 */
const useAddPrismClassAttr = ({
  attributes,
  classNames,
}: useAddPrismClassAttrProps) => {
  const [elements, setElements] = useState<HTMLPreElement[]>([]);

  useEffect(() => {
    const targetElements = document.querySelectorAll('pre');
    setElements(Array.from(targetElements));
  }, []);

  const setClassNameAndAttributes = useCallback(
    (array: HTMLElement[]) => {
      array.forEach((el) => {
        if (classNames) {
          const classNamesArray = classNames.split(' ');
          const isCommandLine = el.classList.contains('command-line');
          const removedClassName = isCommandLine
            ? 'line-numbers'
            : 'command-line';
          const filteredClassNames = classNamesArray.filter(
            (className) => className !== removedClassName
          );
          filteredClassNames.forEach((className) =>
            el.classList.add(className)
          );
        }

        if (attributes) {
          for (const [key, value] of Object.entries(attributes)) {
            el.setAttribute(key, value);
          }
        }
      });
    },
    [attributes, classNames]
  );

  useEffect(() => {
    if (elements.length > 0) setClassNameAndAttributes(elements);
  }, [elements, setClassNameAndAttributes]);
};

export default useAddPrismClassAttr;
