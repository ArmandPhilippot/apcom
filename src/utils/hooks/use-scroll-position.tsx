import { useEffect } from 'react';

/**
 * Execute the given function based on scroll position.
 *
 * @param scrollHandler - A callback function.
 */
export const useScrollPosition = (scrollHandler: () => void) => {
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [scrollHandler]);
};
