import { useCallback, useEffect, useState } from 'react';

export type ScrollPosition = {
  x: number;
  y: number;
};

const defaultPosition: ScrollPosition = { x: 0, y: 0 };

/**
 * React hook to retrieve the current scroll position based on window.
 *
 * @returns {ScrollPosition} The scroll position.
 */
export const useScrollPosition = (): ScrollPosition => {
  const [pos, setPos] = useState(defaultPosition);

  const updatePos = useCallback(() => {
    setPos({ x: window.scrollX, y: window.scrollY });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    window.addEventListener('scroll', updatePos);

    return () => window.removeEventListener('scroll', updatePos);
  }, [updatePos]);

  return pos;
};
