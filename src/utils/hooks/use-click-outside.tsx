import { RefObject, useCallback, useEffect } from 'react';

/**
 * Listen for click/focus outside an element and execute the given callback.
 *
 * @param el - A React reference to an element.
 * @param callback - A callback function to execute on click outside.
 */
const useClickOutside = (
  el: RefObject<HTMLElement>,
  callback: (target: EventTarget) => void
) => {
  /**
   * Check if an event target is outside an element.
   *
   * @param {RefObject<HTMLElement>} ref - A React reference object.
   * @param {EventTarget} target - An event target.
   * @returns {boolean} True if the event target is outside the ref object.
   */
  const isTargetOutside = (
    ref: RefObject<HTMLElement>,
    target: EventTarget
  ): boolean => {
    if (!ref.current) return false;
    return !ref.current.contains(target as Node);
  };

  const handleEvent = useCallback(
    (e: MouseEvent | FocusEvent) => {
      if (e.target && isTargetOutside(el, e.target)) callback(e.target);
    },
    [el, callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('focusin', handleEvent);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('focusin', handleEvent);
    };
  }, [handleEvent]);
};

export default useClickOutside;
