import { useCallback, useEffect, useState } from 'react';

/**
 * Retrieve the scrollbar width of the window.
 *
 * @returns {number} The scrollbar width.
 */
export const getScrollbarWidth = (): number => {
  const defaultWidth = 15;

  if (typeof window === 'undefined') return defaultWidth;

  return window.document.body.clientWidth
    ? window.innerWidth - window.document.body.clientWidth
    : 0;
};

/**
 * React hook to retrieve the current scrollbar width of the window.
 *
 * @returns {number} The scrollbar width.
 */
export const useScrollBarWidth = (): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const updateScrollbarWidth = useCallback(() => {
    setScrollbarWidth(getScrollbarWidth());
  }, []);

  useEffect(() => {
    updateScrollbarWidth();
    window.addEventListener('resize', updateScrollbarWidth);
    window.addEventListener('orientationchange', updateScrollbarWidth);

    return () => {
      window.removeEventListener('resize', updateScrollbarWidth);
      window.removeEventListener('orientationchange', updateScrollbarWidth);
    };
  }, [updateScrollbarWidth]);

  return scrollbarWidth;
};
