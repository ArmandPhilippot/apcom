import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useScrollBarWidth } from '../use-scrollbar-width';

type Styles = {
  overflow: string;
  paddingRight: string;
};

/**
 * React hook to lock/unlock the scroll on the body.
 *
 * @param {boolean} [isScrollLocked] - Should the scroll be locked?
 */
export const useScrollLock = (isScrollLocked = false) => {
  const scrollbarWidth = useScrollBarWidth();
  const initialStyles = useRef<Styles | null>(null);
  const lockedStyles: Styles = useMemo(() => {
    return {
      overflow: 'hidden',
      paddingRight: `calc(${
        initialStyles.current?.paddingRight ?? 0
      } + ${scrollbarWidth}px)`,
    };
  }, [scrollbarWidth]);

  useEffect(() => {
    const computedStyle =
      typeof window === 'undefined'
        ? undefined
        : window.getComputedStyle(document.body);

    initialStyles.current = {
      overflow: computedStyle?.overflow ?? '',
      paddingRight: computedStyle?.paddingRight ?? '',
    };
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = lockedStyles.overflow;
    document.body.style.paddingRight = lockedStyles.paddingRight;
  }, [lockedStyles]);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = initialStyles.current?.overflow ?? '';
    document.body.style.paddingRight =
      initialStyles.current?.paddingRight ?? '';
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (isScrollLocked) lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isScrollLocked, lockScroll, unlockScroll]);
};
