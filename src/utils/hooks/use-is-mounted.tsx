import { RefObject, useEffect, useState } from 'react';

/**
 * Check if an HTML element is mounted.
 *
 * @param {RefObject<HTMLElement>} ref - A React reference to an HTML element.
 * @returns {boolean} True if the HTML element is mounted.
 */
const useIsMounted = (ref: RefObject<HTMLElement>) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current) setIsMounted(true);
  }, [ref]);

  return isMounted;
};

export default useIsMounted;
