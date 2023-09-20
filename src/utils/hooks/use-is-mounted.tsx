import { RefObject, useEffect, useState } from 'react';

/**
 * Check if an HTML element is mounted.
 *
 * @param {RefObject<HTMLElement>} ref - A React reference to an HTML element.
 * @returns {boolean} True if the HTML element is mounted.
 */
export const useIsMounted = (ref: RefObject<HTMLElement>): boolean => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) setIsMounted(true);
  }, [ref]);

  return isMounted;
};
