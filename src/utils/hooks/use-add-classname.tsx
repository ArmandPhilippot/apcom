import { useCallback, useEffect } from 'react';

export type UseAddClassNameProps = {
  className: string;
  element?: HTMLElement;
  elements?: NodeListOf<HTMLElement> | HTMLElement[];
};

/**
 * Add className to the given element(s).
 *
 * @param {UseAddClassNameProps} props - An object with classnames and one or more elements.
 */
const useAddClassName = ({
  className,
  element,
  elements,
}: UseAddClassNameProps) => {
  const classNames = className.split(' ').filter((string) => string !== '');

  const setClassName = useCallback(
    (el: HTMLElement) => {
      el.classList.add(...classNames);
    },
    [classNames]
  );

  useEffect(() => {
    if (element) setClassName(element);
    if (elements && elements.length > 0) elements.forEach(setClassName);
  }, [element, elements, setClassName]);
};

export default useAddClassName;
