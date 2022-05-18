import { useEffect, useState } from 'react';

const useQuerySelectorAll = <T extends keyof HTMLElementTagNameMap>(
  query: string
) => {
  const [elements, setElements] =
    useState<NodeListOf<HTMLElementTagNameMap[T]>>();

  useEffect(() => {
    setElements(document.querySelectorAll(query));
  }, [query]);

  return elements;
};

export default useQuerySelectorAll;
